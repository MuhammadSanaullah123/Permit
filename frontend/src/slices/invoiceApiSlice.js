import { apiSlice } from "./apiSlice";

const USERS_URL = "https://travendev.com/api/api/invoice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "POST",
        body: data,
        /*   credentials: "include", */
      }),
    }),
    getInvoice: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        /*    credentials: "include", */
      }),
    }),
    getAllInvoice: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        /*  credentials: "include", */
      }),
    }),
    getAllInvoiceAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/all/users`,
        method: "GET",
        /*  credentials: "include", */
      }),
    }),
    payInvoice: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/square/pay`,
        method: "POST",
        /*   credentials: "include", */
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceMutation,
  useGetAllInvoiceMutation,
  useGetAllInvoiceAllUsersMutation,
  usePayInvoiceMutation,
} = invoiceApiSlice;
