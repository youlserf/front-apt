import { createSlice } from '@reduxjs/toolkit';

export const badgeRequestSlice = createSlice({
  name: 'badgeRequests',
  initialState: [],
  reducers: {
    setBadgeRequests: (state, action) => {
      return action.payload;
    },
    updateRequestStatus: (state, action) => {
      const index = state.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state[index].status = action.payload.status;
      }
    }
  }
});

export const { setBadgeRequests, updateRequestStatus } = badgeRequestSlice.actions;
export default badgeRequestSlice.reducer;
