import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentInfo: [],
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      state.documentInfo = Object.values(action.payload);
    },
    setSingleDocument: (state, action) => {
      state.documentInfo = action.payload;
    },
    clearDocument: (state, action) => {
      state.documentInfo = [];
    },
  },
});

export const { setDocument, setSingleDocument, clearDocument } =
  documentSlice.actions;

export default documentSlice.reducer;
