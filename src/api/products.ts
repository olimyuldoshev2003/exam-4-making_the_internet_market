import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GlobalBaseQuery from "./index";

export const shopAPI = createApi({
  tagTypes: ["data"],
  reducerPath: "shopApi",
  baseQuery: GlobalBaseQuery,
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `products`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

export const {useGetDataQuery, useDeleteProductMutation} = shopAPI