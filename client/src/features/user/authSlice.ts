import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
  profileImage: string;
}

interface AuthState {
  isLogin: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLogin = true;
      state.user = action.payload;
      state.error = null;
      state.user.profileImage = action.payload.profileImage;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    setImage: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setImage, setError } = authSlice.actions;
export default authSlice.reducer;
