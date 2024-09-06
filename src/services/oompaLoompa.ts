import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { OompaLoompaDetails, PaginatedResponse } from '../types';

export const oompaLoompaApi = createApi({
  reducerPath: 'oompaLoompaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/',
  }),
  endpoints: (builder) => ({
    getOompaLoompas: builder.query<PaginatedResponse, number>({
      query: (page) => `oompa-loompas?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getOompaLoompaById: builder.query<OompaLoompaDetails, string>({
      query: (id) => `oompa-loompas/${id}`,
    }),
  }),
});

export const { useGetOompaLoompasQuery, useGetOompaLoompaByIdQuery } = oompaLoompaApi;
