import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const showSuccessToast = async (
  title,
  message,
  visibilityTime = 1000
) => {
  const apiLevel = await AsyncStorage.getItem("apiLevel");
  let topOffset =
    Platform.OS === "android" ? (Number(apiLevel) >= 35 ? 64 : 20) : 40;
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    // topOffset: topOffset,
    visibilityTime: visibilityTime,
  });
};
export const showErrorToast = async (title, message, visibilityTime) => {
  const apiLevel = await AsyncStorage.getItem("apiLevel");
  console.log("apiLevel", apiLevel);
  let topOffset =
    Platform.OS === "android" ? (Number(apiLevel) >= 35 ? 64 : 20) : 40;
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    // topOffset: topOffset,
    visibilityTime: visibilityTime || 5000,
  });
};
export const showInfoToast = async (title, message, visibilityTime) => {
  const apiLevel = await AsyncStorage.getItem("apiLevel");
  let topOffset =
    Platform.OS === "android" ? (Number(apiLevel) >= 35 ? 64 : 20) : 40;

  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    // topOffset: topOffset,
    visibilityTime: visibilityTime || 5000,
  });
};
