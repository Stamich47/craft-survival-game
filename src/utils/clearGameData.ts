// DEVELOPMENT ONLY: Complete data reset utility
// Use this if you need to manually clear all persisted data

import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store";
import { addItem } from "../store/inventorySlice";
import { ITEMS } from "../data";

// Development utility to add items for testing
export const addTestItems = () => {
  console.log("🎮 Adding test items for development...");

  // Add wood
  const wood = ITEMS["wood"];
  if (wood) {
    store.dispatch(addItem({ item: wood, quantity: 20 }));
    console.log("✅ Added 20x Wood");
  }

  // Add stone
  const stone = ITEMS["stone"];
  if (stone) {
    store.dispatch(addItem({ item: stone, quantity: 15 }));
    console.log("✅ Added 15x Stone");
  }

  // Add rope
  const rope = ITEMS["rope"];
  if (rope) {
    store.dispatch(addItem({ item: rope, quantity: 10 }));
    console.log("✅ Added 10x Rope");
  }

  console.log("🎉 Test items added successfully!");
};

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
