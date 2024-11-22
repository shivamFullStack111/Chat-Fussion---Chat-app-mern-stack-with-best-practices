import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import callReducer from "./slices/callSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    call: callReducer
  },
});

export default store;
