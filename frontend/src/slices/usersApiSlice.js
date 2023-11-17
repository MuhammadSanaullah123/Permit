import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
        /*      withCredentials: true, */
      }),
    }),
    auth: builder.mutation({
      query: (data) => ({
        url: `http://localhost:5000/api/auth`,
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
        /*   withCredentials: true, */
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        body: data,
        credentials: "include",
        /*   withCredentials: true, */
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        credentials: "include",
        /*   withCredentials: true, */
      }),
    }),
    getUserById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
        /*   withCredentials: true, */
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
} = usersApiSlice;
