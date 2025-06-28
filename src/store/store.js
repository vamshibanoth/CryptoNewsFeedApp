import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";
import settingsReducer from "./settingsSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    articles: articleReducer,
    theme: themeReducer,
    settings: settingsReducer,
  },
});

export default store;
