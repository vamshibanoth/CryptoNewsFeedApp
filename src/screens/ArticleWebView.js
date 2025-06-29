import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const ArticleWebView = ({ route, navigation }) => {
  const { url } = route.params;
  const [savedUrls, setSavedUrls] = React.useState([]);

  const toggleSaveArticle = ({ url }) => {
    setSavedUrls((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const shareArticle = async (shareUrl) => {
    try {
      await Share.share({
        message: `Check this article: ${shareUrl}`,
      });
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.replace("NewsFeed");
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.webModalContainer}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />

      <View style={styles.webBottomBar}>
        <TouchableOpacity onPress={() => toggleSaveArticle({ url })}>
          <FontAwesome
            name={savedUrls.includes(url) ? "bookmark" : "bookmark-o"}
            size={22}
            color={savedUrls.includes(url) ? "#b71c1c" : "#555"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareArticle(url)}>
          <Ionicons name="share-social-outline" size={22} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("NewsFeed")}>
          <AntDesign name="close" size={22} color="#555" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ArticleWebView;

const styles = StyleSheet.create({
  webModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webBottomBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
