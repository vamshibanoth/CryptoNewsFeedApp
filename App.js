import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";

import NewsFeed from "./src/screens/NewsFeed";
import ArticleWebView from "./src/screens/ArticleWebView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="NewsFeed"
            component={NewsFeed}
            options={{ title: "Crypto News" }}
          />
          <Stack.Screen
            name="ArticleWebView"
            component={ArticleWebView}
            options={{ title: "Article" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
