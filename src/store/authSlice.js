import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  fetching: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.user = null;
      state.fetching = true;
      state.error = "";
    },
    authSuccess(state, action) {
      state.user = action.payload;
      state.fetching = false;
      state.error = "";
    },
    authFail(state, action) {
      state.user = null;
      state.fetching = false;
      state.error = action.payload;
    },
    authReset(state) {
      state.user = null;
      state.fetching = false;
      state.error = "";
    },
  },
});

export default authSlice.reducer;
export const { authStart, authSuccess, authFail, authReset } =
  authSlice.actions;
