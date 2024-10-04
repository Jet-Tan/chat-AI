import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  us_id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState, // Cập nhật cấu trúc initialState đúng định dạng
  reducers: {
    addAuth: (state, action) => {
      console.log("data", action.payload);
      state.us_id = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth } = authSlice.actions;
export const authSelector = (state) => state.authReducer;
