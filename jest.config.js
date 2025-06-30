module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/jest/setup.js"], // for mocks
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest/setupTestEnv.js",
  ],
  fakeTimers: {
    enableGlobally: true,
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-native-community" +
      "|@react-navigation" +
      "|react-native-vector-icons" +
      "|react-native-webview" +
      "|react-redux" +
      "|@notifee" +
      "|react-native-branch" +
      "|react-native-toast-message" +
      ")/)",
  ],
};
