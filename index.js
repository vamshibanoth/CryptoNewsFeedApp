/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notifee, { EventType } from "@notifee/react-native";
import branch from "react-native-branch";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const branchUrl = detail?.notification?.data?.branch_link;
    if (branchUrl) {
      try {
        await branch.openURL(branchUrl);
        console.log("Branch link opened successfully");
      } catch (err) {
        console.error("Failed to open branch link in BG:", err);
      }
    } else {
      console.warn("No branch_link in BG notification data");
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
