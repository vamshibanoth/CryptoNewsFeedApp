import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NewsFeed from "../src/screens/NewsFeed"; // ✅ Must be default export
console.log("NewsFeed Component:", NewsFeed);

// ✅ Mocks
jest.mock("../src/api/newsapi", () => ({
  fetchArticles: jest.fn(() =>
    Promise.resolve({
      status: "ok",
      articles: [
        {
          title: "Mock Article",
          url: "https://mock.com",
          publishedAt: new Date().toISOString(),
          source: { name: "MockSource" },
        },
      ],
    })
  ),
}));
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
  addEventListener: jest.fn(() => jest.fn()),
}));
jest.mock("../src/components/AppHeader", () => {
  return () => <></>;
});

// ✅ Minimal Redux store
const mockStore = configureStore();
const store = mockStore({
  theme: { layout: "light" },
  settings: { viewMode: "list" },
  user: { token: "mock-token" },
});

describe("NewsFeed Screen", () => {
  it("renders and shows article title", async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <NewsFeed />
      </Provider>
    );

    await waitFor(() => {
      expect(getByTestId("newsfeed-container")).toBeTruthy();
      expect(getByText("Mock Article")).toBeTruthy();
    });
  });
});
