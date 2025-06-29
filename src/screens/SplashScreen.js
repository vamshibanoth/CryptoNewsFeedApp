import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Appearance,
} from "react-native";
import { useDispatch } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { loadTheme } from "../utils/storage";
import branch from "react-native-branch";
import notifee from "@notifee/react-native";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= 1) {
        console.log("Notification permission granted");
      } else {
        console.warn("Notification permission denied");
      }

      let savedTheme = await loadTheme();
      if (!savedTheme) {
        savedTheme = Appearance.getColorScheme() || "light";
      }
      dispatch(setTheme(savedTheme));

      try {
        const params = await branch.getLatestReferringParams();
        console.log("🔗 Branch params from cold start:", params);

        if (params["+clicked_branch_link"]) {
          const meta = params.action_params
            ? JSON.parse(params.action_params)
            : {};
          const articleUrl = meta.url || params.url || null;

          if (articleUrl) {
            navigation.replace("ArticleWebView", { url: articleUrl });
            return;
          }
        }

        navigation.replace("NewsFeed");
      } catch (error) {
        console.error("Branch error:", error);
        navigation.replace("NewsFeed");
      }
    };

    init();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📰 CryptoFeed</Text>
      <ActivityIndicator size="large" color="#4C8BF5" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
