import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLogged = false;
      state.user = null;
      localStorage.removeItem('access_token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
