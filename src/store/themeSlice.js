// src/store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    layout: "system", // 'light' | 'dark' | 'system'
  },
  reducers: {
    setTheme: (state, action) => {
      state.layout = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
