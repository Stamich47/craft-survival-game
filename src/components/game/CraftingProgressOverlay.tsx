import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RECIPES, ITEMS } from "../../data";
import { craftingTimer } from "../../services/CraftingTimerService";

const { width: screenWidth } = Dimensions.get("window");

export const CraftingProgressOverlay: React.FC = () => {
  const currentCraft = useSelector(
    (state: RootState) => state.crafting.currentCraft
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentCraft?.isActive) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const currentProgress = craftingTimer.getCraftingProgress();
      setProgress(currentProgress);
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [currentCraft?.isActive, currentCraft?.recipeId]);

  if (!currentCraft?.isActive) {
    return null;
  }

  const recipe = RECIPES[currentCraft.recipeId];
  const resultItem = recipe ? ITEMS[recipe.result.itemId] : null;

  if (!recipe || !resultItem) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.craftingContainer}>
        {/* Item Icon Container with Progress Fill */}
        <View style={styles.iconContainer}>
          {/* Main item icon (always visible) */}
          {resultItem.icon ? (
            <Image source={resultItem.icon} style={styles.itemIcon} />
          ) : (
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>
                {resultItem.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          {/* Progress overlay (colored fill from bottom) */}
          <View style={[styles.progressOverlay, { height: `${progress}%` }]} />

          {/* Dim overlay for uncompleted portion */}
          <View
            style={[
              styles.dimOverlay,
              {
                height: `${100 - progress}%`,
                top: 0,
              },
            ]}
          />
        </View>

        {/* Item Name and Progress */}
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{resultItem.name}</Text>
          <Text style={styles.progressText}>{Math.floor(progress)}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 80, // Below the player stats
    right: 16,
    zIndex: 1000,
  },
  craftingContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  iconContainer: {
    width: 48,
    height: 48,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  itemIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    zIndex: 1,
  },
  progressOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(74, 144, 226, 0.4)", // Blue tint for progress
    zIndex: 2,
  },
  dimOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for incomplete portion
    zIndex: 3,
  },
  placeholderIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#4a90e2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 12,
    justifyContent: "center",
  },
  itemName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  progressText: {
    color: "#4a90e2",
    fontSize: 12,
    fontWeight: "500",
  },
});
