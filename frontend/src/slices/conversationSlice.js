import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationInfo: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.conversationInfo = Object.values(action.payload);
    },

    clearConversation: (state, action) => {
      state.conversationInfo = [];
    },
  },
});

export const { setConversation, clearConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
