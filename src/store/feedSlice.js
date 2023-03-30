import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeds: [],
  currentFeed: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    feedSet(state, action) {
      state.feeds = action.payload;
      if (action.payload.length !== 0) {
        state.currentFeed = action.payload[0];
      }
    },
    feedSetCurrentById(state, action) {
      const feedId = action.payload;
      state.currentFeed = state.feeds.find((f) => f.id === feedId);
    },
  },
});

export default feedSlice.reducer;
export const { feedSet, feedSetCurrentById } = feedSlice.actions;
