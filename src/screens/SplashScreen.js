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

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // SplashScreen.js
  useEffect(() => {
    const init = async () => {
      let savedTheme = await loadTheme();
      if (!savedTheme) {
        savedTheme = Appearance.getColorScheme() || "light";
      }

      dispatch(setTheme(savedTheme));
      navigation.replace("NewsFeed");
    };

    init();
  }, []);

  //   useEffect(() => {
  //     const init = async () => {
  //       let savedTheme = await loadTheme();

  //       if (!savedTheme) {
  //         savedTheme = Appearance.getColorScheme() || "light";
  //       }

  //       dispatch(setTheme(savedTheme));
  //       navigation.replace("NewsFeed");
  //     };

  //     setTimeout(init, 1000); // optional delay to show splash
  //   }, []);

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
  logo: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
});
