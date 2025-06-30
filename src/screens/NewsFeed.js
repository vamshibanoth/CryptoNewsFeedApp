import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import FastImage from "react-native-fast-image";
import { WebView } from "react-native-webview";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppHeader from "../components/AppHeader";
import { showSuccessToast } from "../utils/helperMethods";
import { fetchArticles } from "../api/newsapi";
import { saveTopic, loadTopic } from "../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { createBranchObject } from "../utils/branchUniversalObject";
import {
  onDisplayNotification,
  setupNotificationChannel,
} from "../utils/notifications";
import { scheduleNotification } from "../utils/scheduleNotification";

const TOPICS = ["Crypto", "Bitcoin", "Ethereum", "Blockchain", "Web3"];

const NewsFeed = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.layout);
  const isDark = theme === "dark";

  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("Crypto");
  const [savedUrls, setSavedUrls] = useState([]);
  const [openedUrls, setOpenedUrls] = useState([]);

  const loadArticles = async (topic = selectedTopic, isRefresh = false) => {
    setLoading(!isRefresh);
    setRefreshing(isRefresh);
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        const res = await fetchArticles(topic);
        if (res.status === "ok") {
          const sorted = res.articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
          setArticles(sorted);
          await AsyncStorage.setItem("CACHED_ARTICLES", JSON.stringify(sorted));
        }
      } else {
        const cached = await AsyncStorage.getItem("CACHED_ARTICLES");
        if (cached) {
          setArticles(JSON.parse(cached));
          showSuccessToast("Offline Mode", "Showing saved articles");
        }
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const saved = await loadTopic();
      setSelectedTopic(saved || "Crypto");
      loadArticles(saved || "Crypto");

      const existing = await AsyncStorage.getItem("SAVED_ARTICLES");
      const parsed = existing ? JSON.parse(existing) : [];
      setSavedUrls(parsed.map((article) => article.url));
    };
    init();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      const latest = articles[0];
      try {
        setupNotificationChannel();
        // onDisplayNotification(latest); //forground notification
        scheduleNotification(latest, 10);
      } catch (e) {
        console.warn("Notification error:", e);
      }
    }
  }, [articles]);

  const onRefresh = () => loadArticles(selectedTopic, true);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const published = new Date(timestamp);
    const diffMs = now - published;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHrs < 24) {
      if (diffHrs >= 1) return `${diffHrs}h ago`;
      if (diffMins >= 1) return `${diffMins}m ago`;
      return "Just now";
    } else {
      return published.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const toggleSaveArticle = async (article) => {
    try {
      const existing = await AsyncStorage.getItem("SAVED_ARTICLES");
      const parsed = existing ? JSON.parse(existing) : [];
      const alreadySaved = parsed.find((a) => a.url === article.url);

      let updated;
      if (alreadySaved) {
        updated = parsed.filter((a) => a.url !== article.url);
        showSuccessToast("Removed", "Article removed from saved");
      } else {
        updated = [...parsed, article];
        showSuccessToast("Saved", "Article saved successfully");
      }

      await AsyncStorage.setItem("SAVED_ARTICLES", JSON.stringify(updated));
      setSavedUrls(updated.map((a) => a.url));
    } catch (error) {
      console.error("Failed to toggle saved article:", error);
    }
  };

  const shareArticle = async (articleurl, title = "Interesting article") => {
    try {
      const metaData = {
        stackName: "App",
        screenName: "ArticleWebView",
        action_params: JSON.stringify({
          url: articleurl,
          mediaSource: "Deeplink",
        }),
        previousScreen: "NewsFeed",
      };

      const branchObj = await createBranchObject(metaData);
      const linkProperties = {
        feature: "share",
        channel: "social_media",
      };

      const { url } = await branchObj.generateShortUrl(linkProperties);
      await Share.share({
        message: `Check this article: ${title}\n${url}`,
      });
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isSaved = savedUrls.includes(item.url);
    const isOpened = openedUrls.includes(item.url);

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedUrl(item.url);
          setSelectedTitle(item.title);
          setModalVisible(true);
          if (!isOpened) setOpenedUrls((prev) => [...prev, item.url]);
        }}
        style={[styles.card, { backgroundColor: isDark ? "#111" : "#f2f2f2" }]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.category}>
            {(item.source?.name || "CRYPTO").toUpperCase()}
            <Text style={styles.timeAgo}>
              {" "}
              · {getTimeAgo(item.publishedAt)}
            </Text>
          </Text>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
            {item.title}
          </Text>
          {item.author && <Text style={styles.author}>By {item.author}</Text>}

          <View style={styles.articleFooter}>
            <TouchableOpacity onPress={() => toggleSaveArticle(item)}>
              <FontAwesome
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={20}
                color={isSaved ? "#b71c1c" : "#555"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => shareArticle(item.url, item.title)}
            >
              <Ionicons name="share-social-outline" size={20} color="#555" />
            </TouchableOpacity>
            {isOpened && (
              <Ionicons name="checkmark-outline" size={20} color="#b71c1c" />
            )}
          </View>
        </View>
        {item.urlToImage && (
          <FastImage
            source={{ uri: item.urlToImage }}
            style={styles.thumbnail}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? "#111" : "#f2f2f2" }}
      testID="newsfeed-container"
    >
      <AppHeader />

      <View
        style={[
          styles.topicBar,
          { backgroundColor: isDark ? "#111" : "#f2f2f2" },
        ]}
      >
        <FlatList
          data={TOPICS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedTopic(item);
                saveTopic(item);
                loadArticles(item);
              }}
              style={[
                styles.topicChip,
                item === selectedTopic && styles.activeTopicChip,
              ]}
            >
              <Text
                style={[
                  styles.topicText,
                  item === selectedTopic && styles.activeTopicText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          testID="articles-list"
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item, idx) => idx.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.webModalContainer}>
          {selectedUrl && (
            <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />
          )}
          <View style={styles.webBottomBar}>
            <TouchableOpacity
              onPress={() => toggleSaveArticle({ url: selectedUrl })}
            >
              <FontAwesome
                name={
                  savedUrls.includes(selectedUrl) ? "bookmark" : "bookmark-o"
                }
                size={22}
                color={savedUrls.includes(selectedUrl) ? "#b71c1c" : "#555"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => shareArticle(selectedUrl, selectedTitle)}
            >
              <Ionicons name="share-social-outline" size={22} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={22} color="#555" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 4,
    color: "#222",
  },
  category: {
    fontSize: 12,
    color: "#b71c1c",
    fontWeight: "bold",
  },
  timeAgo: {
    color: "#888",
    fontWeight: "normal",
  },
  author: {
    fontSize: 12,
    color: "#666",
  },
  articleFooter: {
    flexDirection: "row",
    gap: 20,
    marginTop: 6,
    alignItems: "center",
  },
  topicBar: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: "#eee",
    backgroundColor: "#fff",
  },
  topicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    // backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 20,
  },
  activeTopicChip: {
    backgroundColor: "#b71c1c",
  },
  topicText: {
    color: "#555",
    fontWeight: "500",
  },
  activeTopicText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
