import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { showErrorToast } from "../utils/helperMethods";

export default function useNetInfo() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        showErrorToast("No Internet", "You are currently offline.");
      }
    });

    return () => unsubscribe();
  }, []);
}
