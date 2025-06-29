import notifee, { TriggerType, AndroidImportance } from "@notifee/react-native";
import { createBranchObject } from "../utils/branchUniversalObject";

export async function ensureChannelExists() {
  await notifee.createChannel({
    id: "news",
    name: "News Updates",
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleNotification(article, delayInSeconds = 15) {
  try {
    await ensureChannelExists();

    const meta = {
      stackName: "App",
      screenName: "ArticleWebView",
      action_params: JSON.stringify({
        url: article.url,
        mediaSource: "ScheduledPush",
      }),
      previousScreen: "NewsFeed",
    };

    const branchObj = await createBranchObject(meta);
    const { url: branchUrl } = await branchObj.generateShortUrl({
      feature: "scheduled_notification",
      channel: "local_push",
    });

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + delayInSeconds * 1000,
    };

    await notifee.createTriggerNotification(
      {
        title: "🕒 Scheduled Article Alert",
        body: article.title,
        data: {
          branch_link: branchUrl,
        },
        android: {
          channelId: "news",
          pressAction: {
            id: "default",
          },
        },
      },
      trigger
    );

    console.log("Scheduled notification for:", article.title);
  } catch (err) {
    console.error("Failed to schedule notification:", err);
  }
}
