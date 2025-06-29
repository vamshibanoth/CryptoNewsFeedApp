// src/components/AppHeader.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { toggleViewMode } from "../store/settingsSlice";
import { saveTheme } from "../utils/storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppHeader = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.layout);
  const viewMode = useSelector((state) => state.settings.viewMode);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    saveTheme(newTheme); // Persist in AsyncStorage
  };

  const toggleView = () => {
    dispatch(toggleViewMode());
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111" : "#f2f2f2" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        CryptoFeed
      </Text>

      <View style={styles.actions}>
        {/* Theme toggle */}
        <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
          <Ionicons
            name={theme === "dark" ? "moon" : "sunny"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {/* View mode toggle */}
        {/* <TouchableOpacity onPress={toggleView} style={styles.iconBtn}>
          <Ionicons
            name={viewMode === "list" ? "list" : "swap-vertical"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
});
