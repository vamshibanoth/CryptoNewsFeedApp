import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    viewMode: "list", // 'list' | 'card'
  },
  reducers: {
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "list" ? "card" : "list";
    },
  },
});

export const { toggleViewMode } = settingsSlice.actions;
export default settingsSlice.reducer;
