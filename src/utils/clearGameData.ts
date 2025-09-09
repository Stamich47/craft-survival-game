// DEVELOPMENT ONLY: Complete data reset utility
// Use this if you need to manually clear all persisted data

import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllGameData = async () => {
  try {
    console.log("🔄 Starting complete data reset...");

    // Try to clear all Redux persist data
    try {
      await AsyncStorage.clear();
      console.log("✅ AsyncStorage cleared successfully");
    } catch (error: any) {
      if (error.message?.includes("No such file or directory")) {
        console.log("✅ AsyncStorage already empty (directory not found)");
      } else {
        console.log("⚠️ AsyncStorage clear failed:", error.message);
      }
    }

    // Try to clear specific Redux persist keys
    const persistKeys = [
      "persist:root",
      "persist:player",
      "persist:inventory",
      "persist:crafting",
    ];

    for (const key of persistKeys) {
      try {
        await AsyncStorage.removeItem(key);
        console.log(`✅ Cleared persist key: ${key}`);
      } catch (error) {
        console.log(`⚠️ Failed to clear ${key}:`, error);
      }
    }

    console.log("✅ Data clearing complete - please restart the app manually");
    console.log("🔄 To restart: Close and reopen the app completely");
  } catch (error) {
    console.error("❌ Error clearing game data:", error);
  }
};

// For development console usage
if (__DEV__) {
  (global as any).clearGameData = clearAllGameData;
  console.log("🛠️ Development utility available: clearGameData()");
}

// Usage: Add this to your GameScreen and call it when needed
// import { clearAllGameData } from './clearGameData';
// clearAllGameData(); // Call this to reset everything
