import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      headers.set("x-auth-token", token);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Document", "Conversation"],
  endpoints: (builder) => ({}),
});
