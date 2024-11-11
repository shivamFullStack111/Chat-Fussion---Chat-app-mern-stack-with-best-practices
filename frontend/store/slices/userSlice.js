import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
    isAutheticated:false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAutheticated: (state, action) => {
       state.isAutheticated = action.payload;
    }
  },
});

export default userSlice.reducer;
export const { setUser, setIsLoading,setIsAutheticated } = userSlice.actions;
