// jest/setup.js

// ✅ Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// ✅ Mock NetInfo
jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
  addEventListener: jest.fn(() => jest.fn()),
  useNetInfo: jest.fn(() => ({ isConnected: true })),
}));

// ✅ Mock other React Native modules
jest.mock("react-native-webview", () => "WebView");
jest.mock("react-native-branch", () => ({}));
jest.mock("@notifee/react-native", () => ({}));

// ✅ Mock RefreshControl
jest.mock(
  "react-native/Libraries/Components/RefreshControl/RefreshControl",
  () => {
    const React = require("react");
    return React.forwardRef((props, ref) => {
      const MockedRefreshControl = "RefreshControl";
      return React.createElement(MockedRefreshControl, props);
    });
  }
);

// ✅ Mock ScrollView
jest.mock("react-native/Libraries/Components/ScrollView/ScrollView", () => {
  const React = require("react");
  const { View } = require("react-native");
  return React.forwardRef((props, ref) =>
    React.createElement(View, {
      ...props,
      ref,
      testID: props.testID || "scroll-view",
    })
  );
});

// ✅ ✅ REPLACEMENT: Mock FlatList instead of VirtualizedList
jest.mock("react-native/Libraries/Lists/FlatList", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ data, renderItem, keyExtractor, testID }) => {
    return (
      <View testID={testID || "flat-list"}>
        {data?.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index;
          return <View key={key}>{renderItem({ item, index })}</View>;
        })}
      </View>
    );
  };
});
