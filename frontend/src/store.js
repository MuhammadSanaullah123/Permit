import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import documentReducer from "./slices/documentSlice";
import permitReducer from "./slices/permitSlice";
import conversationReducer from "./slices/conversationSlice";
import invoiceReducer from "./slices/invoiceSlice";

import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
    conversation: conversationReducer,
    invoice: invoiceReducer,
    permit: permitReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
