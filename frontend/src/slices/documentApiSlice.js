import { apiSlice } from "./apiSlice";

const USERS_URL = "https://travendev.com/api/api/document";
/* const USERS_URL = "http://localhost:5000/api/document"; */

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersDocuments: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        /*  credentials: "include", */
      }),
    }),
    getDocuments: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
        /*   credentials: "include", */
      }),
    }),
    getDocumentById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        /*     credentials: "include", */
      }),
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        /*    credentials: "include", */
      }),
    }),
    createDocument: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        /*  credentials: "include", */
      }),
    }),
    updateDocument: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PATCH",
        body: data,
        /*  credentials: "include", */
      }),
    }),
  }),
});

export const {
  useGetDocumentByIdMutation,
  useGetDocumentsMutation,
  useGetAllUsersDocumentsMutation,
  useUpdateDocumentMutation,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
} = documentApiSlice;
