import { apiSlice } from "./apiSlice";

const USERS_URL = "https://travendev.com/api/api/users";
/* const USERS_URL = "http://localhost:5000/api/users"; */

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        /*  credentials: "include", */
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        /*   credentials: "include", */
        /*      withCredentials: true, */
      }),
    }),
    auth: builder.mutation({
      query: (data) => ({
        url: `https://travendev.com/api/api/auth`,
        /*  url: `http://localhost:5000/api/auth`, */

        method: "GET",
        /*  credentials: "include", */
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        /*  credentials: "include", */
        /*   withCredentials: true, */
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        body: data,
        /*  credentials: "include", */
        /*   withCredentials: true, */
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        /*  credentials: "include", */
        /*   withCredentials: true, */
      }),
    }),
    getUserById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        /*  credentials: "include", */
        /*   withCredentials: true, */
      }),
    }),
    getResetCode: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "POST",
        body: data,
        /*   credentials: "include", */
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword/${data.id}/${data.token}`,
        method: "POST",
        body: data,
        /*  credentials: "include", */
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useAuthMutation,
  useUpdateUserMutation,
  useGetAllUsersMutation,
  useGetUserByIdMutation,
  useGetResetCodeMutation,
  useResetPasswordMutation,
} = usersApiSlice;
