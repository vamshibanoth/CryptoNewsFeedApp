import React, { useEffect } from "react";
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
import { fetchArticles } from "../store/articleSlice";

const NewsFeed = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ArticleWebView", { url: item.url })}
      style={styles.card}
    >
      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>
          {new Date(item.published_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (status === "loading")
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (status === "failed") return <Text>Error loading articles</Text>;

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  thumbnail: { width: 80, height: 80, borderRadius: 6 },
  content: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  time: { fontSize: 12, color: "gray", marginTop: 4 },
});
