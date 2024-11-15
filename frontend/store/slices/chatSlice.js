import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isChatOpen: false,
    oponentUser: null,
    allMessages: [],
    conversation: null,
  },
  reducers: {
    setIsChatOpen: (state, action) => {
      state.isChatOpen = action.payload;
    },
    setOponentUser: (state, action) => {
      state.oponentUser = action.payload;
    },
    setallMessages: (state, action) => {
      state.allMessages = action.payload;
    },
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const {
  setIsChatOpen,
  setOponentUser,
  setallMessages,
  setConversation,
} = chatSlice.actions;
