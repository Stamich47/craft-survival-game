import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { createPlayer } from "../store/playerSlice";
import { addItem } from "../store/inventorySlice";
import {
  discoverRecipe,
  setAvailableRecipes,
  clearActiveCrafting,
} from "../store/craftingSlice";
import { PlayerStats, InventoryGrid, CraftingPanel } from "../components/game";
import { ToastNotification } from "../components/ui/ToastNotification";
import { createDefaultPlayer } from "../utils";
import { ITEMS, RECIPES } from "../data";

const { width } = Dimensions.get("window");

export const GameScreen: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player.player);
  const [activeTab, setActiveTab] = useState<"inventory" | "crafting">(
    "inventory"
  );

  const [hasGivenDebugResources, setHasGivenDebugResources] = useState(false);

  // Toast notification state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Function to show craft completion notification
  const showCraftingNotification = (itemName: string, quantity: number) => {
    setToastMessage(`(+${quantity} ${itemName}!)`);
    setToastVisible(true);
  };

  useEffect(() => {
    console.log("GameScreen useEffect running", {
      player: !!player,
      hasGivenDebugResources,
    });
    // Clear any active crafting from previous session
    dispatch(clearActiveCrafting());

    // Initialize player if not exists
    if (!player) {
      console.log("Creating new player and discovering recipes");
      const newPlayer = createDefaultPlayer("Survivor");
      dispatch(createPlayer(newPlayer));

      // Give starting items
      dispatch(addItem({ item: ITEMS.wood, quantity: 10 }));
      dispatch(addItem({ item: ITEMS.stone, quantity: 5 }));
      dispatch(addItem({ item: ITEMS.berries, quantity: 3 }));
      dispatch(addItem({ item: ITEMS.water, quantity: 2 }));

      // Discover basic recipes
      dispatch(discoverRecipe("wooden_plank"));
      dispatch(discoverRecipe("wooden_axe"));
      dispatch(discoverRecipe("wooden_pickaxe"));
    } else {
      console.log("Player already exists, skipping initialization");
    }

    // ALWAYS discover recipes to ensure they're available (temporary fix)
    console.log("Force discovering recipes");
    dispatch(discoverRecipe("wooden_plank"));
    dispatch(discoverRecipe("wooden_axe"));
    dispatch(discoverRecipe("wooden_pickaxe"));

    // TEMPORARY: Add more wood for testing (remove this later)
    // This will give you wood only once per app session during development
    if (
      player &&
      !hasGivenDebugResources &&
      process.env.NODE_ENV === "development"
    ) {
      dispatch(addItem({ item: ITEMS.wood, quantity: 10 }));
      dispatch(addItem({ item: ITEMS.stone, quantity: 5 }));
      setHasGivenDebugResources(true);
    }

    // Set available recipes
    dispatch(setAvailableRecipes(Object.values(RECIPES)));
  }, []); // Run only on mount

  if (!player) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Initializing Game...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Player Info Header */}
        <View style={styles.header}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerLevel}>Level {player.level}</Text>
          <Text style={styles.playerExp}>
            EXP: {player.experience} / {player.level * 100}
          </Text>
        </View>

        {/* Player Stats */}
        <PlayerStats />

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "inventory" && styles.activeTab]}
            onPress={() => setActiveTab("inventory")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "inventory" && styles.activeTabText,
              ]}
            >
              Inventory
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "crafting" && styles.activeTab]}
            onPress={() => setActiveTab("crafting")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "crafting" && styles.activeTabText,
              ]}
            >
              Crafting
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "inventory" ? (
            <InventoryGrid />
          ) : (
            <CraftingPanel onCraftComplete={showCraftingNotification} />
          )}
        </View>
      </View>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "rgba(0,0,0,0.8)",
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 12,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  playerLevel: {
    fontSize: 18,
    color: "#4a90e2",
    marginTop: 4,
  },
  playerExp: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.8)",
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#4a90e2",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },
  activeTabText: {
    color: "#fff",
  },
  tabContent: {
    flex: 1,
    minHeight: 400,
  },
});
