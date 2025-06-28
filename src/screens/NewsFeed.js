import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { fetchArticles } from "../store/articleSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import { showSuccessToast } from "../utils/helperMethods";
import { fetchArticles } from "../api/newsapi";

const NewsFeed = ({ navigation }) => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  // const { items, status } = useSelector((state) => state.articles);

  useEffect(() => {
    // dispatch(fetchArticles());
    const loadArticles = async () => {
      try {
        const res = await fetchArticles();
        console.log("res ==>", res);
        if (res.status === "ok") {
          setArticles(res.articles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    loadArticles();
  }, []);

  const renderItem = ({ item }) => {
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
        // Show formatted date: Jun 25, 2025
        return published.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ArticleWebView", { url: item.url })}
        style={styles.card}
      >
        {/* Left section */}
        <View style={{ flex: 1 }}>
          <Text style={styles.category}>
            {(item.source?.name || "CRYPTO").toUpperCase()}
            <Text style={styles.timeAgo}>
              {" "}
              · {getTimeAgo(item.publishedAt)}
            </Text>
          </Text>

          <Text style={styles.title}>{item.title}</Text>
          {item.author && <Text style={styles.author}>By {item.author}</Text>}
        </View>

        {/* Right thumbnail */}
        {item.urlToImage && (
          <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
        )}
      </TouchableOpacity>
    );
  };

  // if (status === "loading")
  //   return <ActivityIndicator style={{ marginTop: 50 }} />;
  // if (status === "failed") return <Text>Error loading articles</Text>;

  const handleToast = () => {
    showSuccessToast("Success", "namasthaee");
  };
  return (
    <SafeAreaView>
      <AppHeader />
      <TouchableOpacity onPress={handleToast}>
        <Text>Test Toast</Text>
      </TouchableOpacity>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
      />
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
    color: "#b71c1c", // dark red like the app
    fontWeight: "bold",
  },
  author: {
    fontSize: 12,
    color: "#666",
  },
  timeAgo: {
    color: "#888", // grey or any accent color
    fontWeight: "normal",
  },
});
