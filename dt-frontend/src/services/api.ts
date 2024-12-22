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
  }),
});

export const {
  useGetStreamDataQuery,
  useGetHealthStatusQuery,
  useGetItemsQuery,
  useGetItemByIdQuery,
  useImportDataMutation,
  useClearTableMutation,
} = api;
