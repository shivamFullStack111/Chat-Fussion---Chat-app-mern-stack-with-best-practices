import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setisAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsLoading, setisAuthenticated } = userSlice.actions;
