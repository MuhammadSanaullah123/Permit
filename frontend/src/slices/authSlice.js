import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setUsers: (state, action) => {
      state.userInfo = Object.values(action.payload);
    },
    setSingleUser: (state, action) => {
      state.userInfo = action.payload;
    },

    clearCredentials: (state, action) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setCredentials, clearCredentials, setUsers, setSingleUser } =
  authSlice.actions;

export default authSlice.reducer;
