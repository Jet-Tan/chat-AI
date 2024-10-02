import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  accesstoken: "",
};
const authSlice = createSlice({
  name: "auth",

  initialState: {
    authData: initialState,
  },
});
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer.authData;
