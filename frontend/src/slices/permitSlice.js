import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permitInfo: [],
};

const permitSlice = createSlice({
  name: "permit",
  initialState,
  reducers: {
    setPermit: (state, action) => {
      state.permitInfo = action.payload;
    },
    /*    setSinglePermit: (state, action) => {
      state.permitInfo = action.payload;
    }, */
    clearPermit: (state, action) => {
      state.permitInfo = [];
    },
  },
});

export const { setPermit, clearPermit } = permitSlice.actions;

export default permitSlice.reducer;
