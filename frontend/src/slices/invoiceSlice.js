import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceInfo: [],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => {
      state.invoiceInfo = action.payload;
    },
    setAllInvoice: (state, action) => {
      state.invoiceInfo = Object.values(action.payload);
    },
    clearInvoice: (state, action) => {
      state.invoiceInfo = [];
    },
  },
});

export const { setInvoice, setAllInvoice, clearInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
