import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: '',
  badges: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.badges = action.payload.badges;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
