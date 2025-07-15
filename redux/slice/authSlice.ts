// src/redux/slice/authSlice.js
import { createSlice } from '@reduxjs/toolkit';



let storedAuth = null;

if (typeof window !== 'undefined') {
  const authFromStorage = localStorage.getItem('auth');
  storedAuth = authFromStorage ? JSON.parse(authFromStorage) : null;
}

const initialState = {
  user: null,         // Store user info
  isLoggedIn: false,  // Login status
  token: null,        // JWT or auth token (optional)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;

      localStorage.setItem('auth', JSON.stringify(state))
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
           localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;