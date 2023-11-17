import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/conversation";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversation: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetConversationMutation, useCreateConversationMutation } =
  conversationApiSlice;
