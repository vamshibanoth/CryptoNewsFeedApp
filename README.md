# 📰 Crypto News Feed App

A lightweight React Native CLI application that fetches and displays the latest cryptocurrency-related news articles in a clean and minimal feed format. Supports offline caching, topic-based filtering, saving articles, sharing via deep links, and push notifications for new articles.

---

## 🚀 Design inspiration:

The Hindu News app

## 🚀 Features

### ✅ Core Functionality

* **News Feed**: View latest articles based on selected crypto topics. useing the `https://newsapi.org/` api key is stored in .env file so please create your apikey and update it.
* **Topic Filtering**: Choose between topics like `Crypto`, `Bitcoin`, `Ethereum`, etc.
* **Save Articles**: Bookmark your favorite articles locally.
* **Offline Mode**: Displays cached articles when offline.
* **Article Viewer**: In-app modal-based WebView for reading full articles.

### 🔗 Sharing & Engagement

* **Share Articles**: Share articles via [Branch.io](https://branch.io/) generated short links.
* **Check Read Status**: Marks articles you've already opened.
* **Push Notifications**: Scheduled notifications for latest articles using Notifee and FCM.

### ⚙️ Tech Stack

* **React Native CLI**
* **Redux (without thunk)**
* **Notifee** for local push notifications
* **Branch SDK** for deep linking & share tracking
* **AsyncStorage** for local storage
* **NetInfo** for online/offline detection
* **FastImage** for optimized image loading
* **Jest + Testing Library** for unit tests

---

## 🛠️ Getting Started

### 1. **Clone the Repo**

```bash
git clone https://github.com/vamshibanoth/CryptoNewsFeedApp.git
cd CryptoNewsFeedApp
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Link Native Dependencies**

```bash
npx react-native link
```

> ⚠️ Ensure all pods are installed (for iOS):

```bash
cd ios && pod install && cd ..
```


### 4. **Run the App**

```bash
npx react-native run-android
# or
npx react-native run-ios
```

