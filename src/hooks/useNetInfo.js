// src/hooks/useNetInfo.js
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export default function useNetInfo() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert("No Internet", "You are currently offline.");
      }
    });

    return () => unsubscribe();
  }, []);
}
