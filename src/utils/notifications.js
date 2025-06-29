import notifee, { AndroidImportance } from "@notifee/react-native";
import { createBranchObject } from "./branchUniversalObject";

export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: "news",
    name: "News Updates",
    importance: AndroidImportance.HIGH,
  });
}

export async function onDisplayNotification(article) {
  try {
    const branchMeta = {
      stackName: "App",
      screenName: "ArticleWebView",
      action_params: JSON.stringify({
        url: article.url,
        mediaSource: "Notification",
      }),
      previousScreen: "NewsFeed",
    };

    const branchObj = await createBranchObject(branchMeta);
    const { url: branchUrl } = await branchObj.generateShortUrl({
      feature: "notification",
      channel: "local_push",
    });

    await notifee.displayNotification({
      title: "📰 New Article Available",
      body: article.title,
      android: {
        channelId: "news",
        smallIcon: "ic_launcher",
        pressAction: {
          id: "default",
          launchActivity: "default",
          input: false,
        },
      },
      data: {
        branch_link: branchUrl,
      },
    });
  } catch (err) {
    console.error("Notification Error:", err);
  }
}
