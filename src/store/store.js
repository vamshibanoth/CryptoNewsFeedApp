import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";

const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

export default store;
