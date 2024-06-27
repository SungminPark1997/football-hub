import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  isLogin: boolean;
  //user: User | null;
  //error: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  //user: null,
  //error: null
};
const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
  /*후에 구체적인 작업
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null
  },
  reducers: {
    loginRequest: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }*/
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
