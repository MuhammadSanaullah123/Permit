import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/invoice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getInvoice: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllInvoice: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceMutation,
  useGetAllInvoiceMutation,
} = invoiceApiSlice;
