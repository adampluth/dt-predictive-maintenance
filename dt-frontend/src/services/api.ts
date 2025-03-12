import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Item } from '../types/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
    getStreamData: builder.query<Item[], void>({
      query: () => '/stream',
    }),
    getHealthStatus: builder.query<{ status: string }, void>({
      query: () => '/health',
    }),
    getItems: builder.query<Item[], void>({
      query: () => '/items',
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
    }),
    importData: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/db/import',
        method: 'POST',
        body: formData,
      }),
    }),
    clearTable: builder.mutation<void, void>({
      query: () => ({
        url: '/db/clear',
        method: 'DELETE',
      }),
    }),
    startDataStreamSession: builder.mutation<{ session_id: number }, void>({
      query: () => {
        console.log("Calling API: /sessions/start");
        return {
          url: "/sessions/start",
          method: "POST",
        };
      },
    }),
    endDataStreamSession: builder.mutation<void, number>({
      query: (sessionId) => {
        console.log(`Calling API: /sessions/end/${sessionId}`);
        return {
          url: `/sessions/end/${sessionId}`,
          method: "POST",
        };
      },
    }),    
    streamSensorData: builder.query<string[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/sensor-stream/");

        try {
          await new Promise<void>((resolve, reject) => {
            ws.onopen = () => resolve();
            ws.onerror = (error) => reject(error);
          });

          ws.onmessage = (event) => {
            updateCachedData((draft) => {
              draft.push(event.data);
              if (draft.length > 10) draft.shift();
            });
          };
        } catch (error) {
          console.error("WebSocket error:", error);
        }

        await cacheEntryRemoved;
        ws.close();
      },
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
  useStreamSensorDataQuery
} = api;
