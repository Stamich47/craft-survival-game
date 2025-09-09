import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  startCrafting,
  checkCraftingComplete,
  completeCrafting,
  discoverRecipe,
} from "../../store/craftingSlice";
import { addItem, removeItem } from "../../store/inventorySlice";
import { gainExperience } from "../../store/playerSlice";
import { Button, ProgressBar } from "../ui";
import { Recipe } from "../../types";
import { RECIPES, ITEMS } from "../../data";
import { canCraftRecipe } from "../../utils";

interface CraftingPanelProps {
  onCraftComplete?: (itemName: string, quantity: number) => void;
}

export const CraftingPanel: React.FC<CraftingPanelProps> = ({
  onCraftComplete,
}) => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player.player);
  const inventory = useSelector(
    (state: RootState) => state.inventory.inventory
  );
  const { discoveredRecipes, currentCraft } = useSelector(
    (state: RootState) => state.crafting
  );

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  // Ensure basic recipes are discovered (fallback)
  React.useEffect(() => {
    console.log("CraftingPanel: Ensuring recipes are discovered");
    console.log("Current discovered recipes:", discoveredRecipes);

    if (discoveredRecipes.length === 0) {
      console.log("No recipes discovered, adding basic recipes");
      dispatch(discoverRecipe("wooden_plank"));
      dispatch(discoverRecipe("wooden_axe"));
      dispatch(discoverRecipe("wooden_pickaxe"));
    }
  }, [dispatch, discoveredRecipes]);

  const completeCraftingProcess = React.useCallback(
    (recipe: Recipe) => {
      if (!player || !inventory) {
        console.log("Completion failed: missing player or inventory", {
          player: !!player,
          inventory: !!inventory,
        });
        return;
      }

      console.log("Completing crafting for recipe:", recipe.name);
      console.log(
        "Current inventory slots before processing:",
        inventory.slots.filter((slot) => slot.item).length
      );

      // First verify we still have the ingredients (in case something changed during crafting)
      const canStillCraft = canCraftRecipe(recipe, inventory, player.level);
      if (!canStillCraft) {
        console.log("ERROR: Cannot complete crafting - missing ingredients");
        dispatch(completeCrafting()); // Clear the crafting state
        return;
      }

      // Remove ingredients
      console.log("Consuming ingredients:");
      recipe.ingredients.forEach((ingredient) => {
        const item = ITEMS[ingredient.itemId];
        console.log(
          `- Removing ${ingredient.quantity} ${item?.name || ingredient.itemId}`
        );
        dispatch(
          removeItem({
            itemId: ingredient.itemId,
            quantity: ingredient.quantity,
          })
        );
      });

      // Add result to inventory
      const resultItem = ITEMS[recipe.result.itemId];
      if (resultItem) {
        console.log(
          "Adding item to inventory:",
          resultItem.name,
          "quantity:",
          recipe.result.quantity
        );
        console.log("Result item details:", resultItem);
        dispatch(
          addItem({ item: resultItem, quantity: recipe.result.quantity })
        );

        // Show notification
        if (onCraftComplete) {
          console.log("Triggering completion notification");
          onCraftComplete(resultItem.name, recipe.result.quantity);
        }
      } else {
        console.log(
          "ERROR: Result item not found for ID:",
          recipe.result.itemId
        );
      }

      // Give experience
      console.log("Adding experience:", recipe.requiredLevel * 10);
      dispatch(gainExperience(recipe.requiredLevel * 10));

      // Complete crafting
      console.log("Clearing crafting state");
      dispatch(completeCrafting());
    },
    [player, inventory, dispatch, onCraftComplete]
  );

  // Timer for updating crafting progress
  useEffect(() => {
    console.log("Timer useEffect triggered", {
      isActive: currentCraft?.isActive,
      recipeId: currentCraft?.recipeId,
      startTime: currentCraft?.startTime,
    });

    if (!currentCraft?.isActive) {
      console.log("Timer NOT starting - craft not active");
      setCurrentProgress(0); // Reset progress when not crafting
      return;
    }

    console.log("Timer starting for craft:", currentCraft);
    let hasCompleted = false; // Guard to prevent multiple completions

    const interval = setInterval(() => {
      // Check if crafting is complete
      const recipe = RECIPES[currentCraft.recipeId];
      if (recipe && !hasCompleted) {
        const elapsed = (Date.now() - currentCraft.startTime) / 1000;
        const progressPercent = Math.min(
          100,
          (elapsed / recipe.craftingTime) * 100
        );

        // Update progress state to trigger re-render
        setCurrentProgress(progressPercent);

        console.log(
          `Crafting progress - Elapsed: ${elapsed.toFixed(2)}s, Required: ${
            recipe.craftingTime
          }s, Progress: ${progressPercent.toFixed(1)}%`
        );

        if (elapsed >= recipe.craftingTime) {
          console.log("Crafting should complete now!");
          hasCompleted = true; // Prevent multiple completions
          setCurrentProgress(100); // Ensure 100% before completion
          // Complete the crafting first, then clear state
          completeCraftingProcess(recipe);
        }
      }
    }, 100); // Update every 100ms for smooth progress

    return () => {
      console.log("Timer cleanup");
      clearInterval(interval);
    };
  }, [
    currentCraft?.isActive,
    currentCraft?.recipeId,
    currentCraft?.startTime,
    completeCraftingProcess,
  ]);

  const availableRecipes = Object.values(RECIPES).filter(
    (recipe) =>
      discoveredRecipes.includes(recipe.id) ||
      recipe.requiredLevel <= (player?.level || 1)
  );

  const handleCraft = (recipeId: string) => {
    if (!player || !inventory || currentCraft?.isActive) return;

    const recipe = RECIPES[recipeId];
    if (canCraftRecipe(recipe, inventory, player.level)) {
      console.log("Starting craft for recipe:", recipe.name);
      console.log("Ingredients will be consumed on completion");
      dispatch(startCrafting(recipeId));
    }
  };

  const renderRecipe = ({ item: recipe }: { item: Recipe }) => {
    const canCraft = player
      ? canCraftRecipe(recipe, inventory, player.level)
      : false;

    return (
      <View style={styles.recipeCard}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.recipeDescription}>{recipe.description}</Text>

        <View style={styles.ingredients}>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient) => {
            const item = ITEMS[ingredient.itemId];
            return (
              <Text key={ingredient.itemId} style={styles.ingredient}>
                • {item?.name || ingredient.itemId} x{ingredient.quantity}
              </Text>
            );
          })}
        </View>

        <View style={styles.recipeFooter}>
          <Text style={styles.craftTime}>Time: {recipe.craftingTime}s</Text>
          <Button
            title="Craft"
            onPress={() => handleCraft(recipe.id)}
            disabled={!canCraft || currentCraft?.isActive}
            size="small"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crafting</Text>

      {currentCraft?.isActive &&
        (() => {
          const recipe = RECIPES[currentCraft.recipeId];

          return (
            <View style={styles.currentCraft}>
              <Text style={styles.craftingText}>
                Crafting: {recipe?.name || "Unknown"}
              </Text>
              <ProgressBar
                current={currentProgress}
                max={100}
                label="Progress"
                color={["#4a90e2", "#357abd"]}
                height={16}
              />
            </View>
          );
        })()}

      <FlatList
        data={availableRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.9)",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  currentCraft: {
    backgroundColor: "rgba(74, 144, 226, 0.2)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  craftingText: {
    color: "#4a90e2",
    fontSize: 16,
    fontWeight: "600",
  },
  progressText: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
  recipesList: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
  },
  ingredients: {
    marginBottom: 12,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 12,
    color: "#ddd",
    marginLeft: 8,
  },
  recipeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  craftTime: {
    fontSize: 12,
    color: "#999",
  },
});
