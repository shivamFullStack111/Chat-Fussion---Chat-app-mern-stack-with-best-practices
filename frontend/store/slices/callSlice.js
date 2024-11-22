import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    isCallComing: false,
    isCallActive: false,
    call_oponent: null,
    call_type: "",
    isCallSending: false,
  },

  reducers: {
    setIsCallComing(state, action) {
      state.isCallComing = action.payload;
    },
    setIsCallActive(state, action) {
      state.isCallActive = action.payload;
    },
    setCallOponent(state, action) {
      state.call_oponent = action.payload;
    },
    setCallType(state, action) {
      state.call_type = action.payload;
    },
    setIsCallSending(state, action) {
      state.isCallSending = action.payload;
    },
  },
});

export default callSlice.reducer;
export const {
  setIsCallActive,
  setCallOponent,
  setCallType,
  setIsCallComing,
  setIsCallSending,
} = callSlice.actions;
