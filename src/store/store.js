import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    settings: settingsReducer,
  },
});

export default store;
