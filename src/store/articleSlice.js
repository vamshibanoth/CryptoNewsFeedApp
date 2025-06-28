// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchArticles = createAsyncThunk("articles/fetch", async () => {
//   const res = await axios.get(
//     "https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY&public=true"
//   );
//   return res.data.results;
// });

// const articleSlice = createSlice({
//   name: "articles",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArticles.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchArticles.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchArticles.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default articleSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk("articles/fetch", async () => {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=crypto&apiKey=6a52bdc7de3c49d38895cdfba705c005"
    // "https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY&public=true"
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("data ==>", data);
  return data.results;
});

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default articleSlice.reducer;
