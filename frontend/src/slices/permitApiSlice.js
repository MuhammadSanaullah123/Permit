import { apiSlice } from "./apiSlice";

const USERS_URL = "https://travendev.com/api/api/permit";
/* const USERS_URL = "http://localhost:5000/api/permit"; */

export const permitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermitById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        /*     credentials: "include", */
      }),
    }),
    createPermit: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        /*  credentials: "include", */
      }),
    }),
  }),
});

export const { useGetPermitByIdMutation, useCreatePermitMutation } =
  permitApiSlice;
