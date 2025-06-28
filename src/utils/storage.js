import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTheme = async (theme) => {
  try {
    await AsyncStorage.setItem("APP_THEME", theme);
  } catch (e) {
    console.error("Failed to save theme", e);
  }
};

export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem("APP_THEME");
    return theme;
  } catch (e) {
    console.error("Failed to load theme", e);
    return null;
  }
};
