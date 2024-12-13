import { createSlice } from '@reduxjs/toolkit';

export const badgeSlice = createSlice({
  name: 'badges',
  initialState: [], 
  reducers: {
    setBadges: (state, action) => {
      return action.payload;
    }
  }
});

export const { setBadges } = badgeSlice.actions;
export default badgeSlice.reducer;
