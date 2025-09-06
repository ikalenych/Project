import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  nickname: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
