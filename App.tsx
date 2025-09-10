import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { store, persistor } from "./src/store";
import { GameScreen, VoxelGameScreen } from "./src/screens";
import { craftingTimer } from "./src/services/CraftingTimerService";
import { addTestItems } from "./src/utils/clearGameData";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"inventory" | "voxel">(
    "voxel"
  );

  // Start the crafting timer when the app loads
  useEffect(() => {
    craftingTimer.start();

    // Add development utilities to global scope
    if (__DEV__) {
      (global as any).addTestItems = addTestItems;
      console.log("🛠️ Development utility available: addTestItems()");
    }

    // Cleanup when app unmounts
    return () => {
      craftingTimer.stop();
    };
  }, []);

  const AppContent = () => (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              currentScreen === "inventory" && styles.activeButton,
            ]}
            onPress={() => setCurrentScreen("inventory")}
          >
            <Text
              style={[
                styles.toggleText,
                currentScreen === "inventory" && styles.activeText,
              ]}
            >
              Inventory/Crafting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              currentScreen === "voxel" && styles.activeButton,
            ]}
            onPress={() => setCurrentScreen("voxel")}
          >
            <Text
              style={[
                styles.toggleText,
                currentScreen === "voxel" && styles.activeText,
              ]}
            >
              Voxel World
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {currentScreen === "inventory" ? <GameScreen /> : <VoxelGameScreen />}
    </>
  );

  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1a1a1a",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>
                Loading Game...
              </Text>
            </View>
          }
          persistor={persistor}
        >
          <AppContent />
        </PersistGate>
      ) : (
        <AppContent />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1a1a1a",
  },
  screenToggle: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#333",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  toggleText: {
    color: "#ccc",
    fontSize: 12,
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});
