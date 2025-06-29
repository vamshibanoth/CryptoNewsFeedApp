import React, { useEffect, useRef } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
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

import notifee, { EventType } from "@notifee/react-native";
import branch from "react-native-branch";

const Stack = createNativeStackNavigator();

function AppWrapper() {
  const navigationRef = useNavigationContainerRef();
  useNetInfo();

  const themeSetting = useSelector((state) => state.theme.layout);
  const systemTheme = useColorScheme();

  const appTheme =
    themeSetting === "system"
      ? systemTheme === "dark"
        ? DarkTheme
        : DefaultTheme
      : themeSetting === "dark"
      ? DarkTheme
      : DefaultTheme;

  useEffect(() => {
    // 🔁 Branch Deep Link Handler (Foreground/Background)
    const unsubscribeBranch = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error("🔴 Branch Error:", error);
        return;
      }

      console.log("📦 Branch Params from subscribe:", params);

      if (params["+clicked_branch_link"]) {
        const meta = params.action_params
          ? JSON.parse(params.action_params)
          : {};
        const articleUrl = meta.url || params.url || null;

        if (articleUrl) {
          console.log("🧭 Navigating to ArticleWebView from Branch link...");
          navigationRef?.navigate("ArticleWebView", { url: articleUrl });
        }
      }
    });

    // 🔔 Notifee Foreground Notification Tap
    const unsubscribeNotifee = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        console.log("📩 Notifee Event Type:", type, detail);

        if (type === EventType.PRESS) {
          const branchUrl = detail?.notification?.data?.branch_link;
          console.log("🌱 branch_link from notification:", branchUrl);

          if (branchUrl) {
            try {
              await branch.openURL(branchUrl);
              console.log("✅ branch.openURL triggered");
            } catch (err) {
              console.error("❌ Failed to open Branch URL:", err);
            }
          } else {
            console.warn("⚠️ branch_link missing in Notifee notification");
          }
        }
      }
    );

    return () => {
      unsubscribeBranch?.();
      unsubscribeNotifee?.();
    };
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef} theme={appTheme}>
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
