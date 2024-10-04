import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  phone: "",
  accesstoken: "",
};
const authSlice = createSlice({
  name: "auth",

  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer.authData;
