import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 10,
        borderLeftColor: "#22bb33",
        marginTop: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Manrope",
      }}
      text2Style={{
        fontWeight: "400",
        fontFamily: "Manrope",
        maxWidth: undefined,
      }}
      text2NumberOfLines={2}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 10,
        borderLeftColor: "#ff0505",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Manrope",
      }}
      text2Style={{
        fontWeight: "400",
        fontFamily: "Manrope",
        maxWidth: undefined,
      }}
      text2NumberOfLines={2}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 10,
        borderLeftColor: "#00b4d8",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Manrope",
      }}
      text2Style={{
        fontWeight: "400",
        fontFamily: "Manrope",
        maxWidth: undefined,
      }}
      text2NumberOfLines={2}
    />
  ),
};
