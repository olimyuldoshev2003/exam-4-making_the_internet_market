import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopAPI = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `products`,
    }),
  }),
});

export const {useGetDataQuery} = shopAPI