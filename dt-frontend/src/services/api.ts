import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../types/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  tagTypes: ["Session", "Stream"],
  endpoints: (builder) => ({
    getStreamData: builder.query<Item[], void>({
      query: () => "/stream",
    }),
    getHealthStatus: builder.query<{ status: string }, void>({
      query: () => "/health",
    }),
    getItems: builder.query<Item[], void>({
      query: () => "/items",
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
    }),
    importData: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/db/import",
        method: "POST",
        body: formData,
      }),
    }),
    clearTable: builder.mutation<void, void>({
      query: () => ({
        url: "/db/clear",
        method: "DELETE",
      }),
    }),
    startDataStreamSession: builder.mutation<{ session_id: number }, void>({
      query: () => ({
        url: "/sessions/start",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),
    endDataStreamSession: builder.mutation<void, number>({
      query: (sessionId) => ({
        url: `/sessions/end/${sessionId}`,
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),
    streamSensorData: builder.query<string[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/sensor-stream/");
        console.log("📡 WebSocket connecting...");

        try {
          await new Promise<void>((resolve, reject) => {
            ws.onopen = () => {
              console.log("WebSocket connected");
              resolve();
            };
            ws.onerror = (error) => {
              console.error("WebSocket error:", error);
              reject(error);
            };
          });

          ws.onmessage = (event) => {
            updateCachedData((draft) => {
              draft.push(event.data);
              if (draft.length > 10) draft.shift(); // Keep last 10 messages
            });
          };
        } catch (error) {
          console.error("WebSocket failed:", error);
        }

        await cacheEntryRemoved;
        console.log("WebSocket closing...");
        ws.close();
      },
    }),
    getCurrentSession: builder.query<{ session_id: number | null }, void>({
      query: () => "/sessions/current",
      providesTags: ["Session"], // Auto-refreshes when `Session` is invalidated
    }),
  }),
});

export const {
  useGetStreamDataQuery,
  useGetHealthStatusQuery,
  useGetItemsQuery,
  useGetItemByIdQuery,
  useImportDataMutation,
  useClearTableMutation,
  useStartDataStreamSessionMutation,
  useEndDataStreamSessionMutation,
  useStreamSensorDataQuery,
  useGetCurrentSessionQuery,
} = api;
