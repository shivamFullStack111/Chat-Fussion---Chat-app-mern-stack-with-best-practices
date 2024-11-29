import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
    isAuthenticated: false,
    allUsers: null,
    activeUsers: [],
    allConversation: [],
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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setAllConversation: (state, action) => {
      state.allConversation = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  setIsLoading,
  setisAuthenticated,
  setAllUsers,
  setActiveUsers,
  setAllConversation,
} = userSlice.actions;
