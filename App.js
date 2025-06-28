// App.js
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, Provider } from "react-redux";
import store from "./src/store/store";
import SplashScreen from "./src/screens/SplashScreen";
import NewsFeed from "./src/screens/NewsFeed";
import ArticleWebView from "./src/screens/ArticleWebView";
import useNetInfo from "./src/hooks/useNetInfo";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/toastConfig";

const Stack = createNativeStackNavigator();

function AppWrapper() {
  useNetInfo(); // global network hook

  const themeSetting = useSelector((state) => state.theme.layout);
  const systemTheme = useColorScheme(); // 'light' | 'dark'

  const appTheme =
    themeSetting === "system"
      ? systemTheme === "dark"
        ? DarkTheme
        : DefaultTheme
      : themeSetting === "dark"
      ? DarkTheme
      : DefaultTheme;

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="NewsFeed" component={NewsFeed} />
        <Stack.Screen name="ArticleWebView" component={ArticleWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
      <Toast config={toastConfig} />
    </Provider>
  );
}
