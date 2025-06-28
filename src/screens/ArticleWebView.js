import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ArticleWebView = ({ route }) => {
  return <WebView source={{ uri: route.params.url }} style={styles.webview} />;
};

export default ArticleWebView;

const styles = StyleSheet.create({
  webview: { flex: 1 },
});
