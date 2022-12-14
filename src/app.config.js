import 'dotenv/config';

export default{
  "expo": {
    "name": "Weasley Clock",
    "slug": "Weasley-Clock",
    "version": "1.0.0",
    "orientation": "portrait",
    "primaryColor": "#6B4EFF",
    "icon": "./app/assets/icon-clock-v2.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./app/assets/splash-clock.png",
      "resizeMode": "contain",
      "backgroundColor": "#C6C4FF"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./app/assets/adaptive-icon-clock-2.png",
        "backgroundColor": "#6B4EFF",
      },
      "icon": "./app/assets/adaptive-icon-clock-2.png",
    },
    "web": {
      "favicon": "./app/assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
    }
  }
}
