import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import feedReducer from "./feedSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
  },
});
