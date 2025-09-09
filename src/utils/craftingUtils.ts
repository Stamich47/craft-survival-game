import { Recipe, Inventory } from "../types";
import { hasEnoughItems } from "./inventoryUtils";

export const canCraftRecipe = (
  recipe: Recipe,
  inventory: Inventory,
  playerLevel: number
): boolean => {
  // Check if player has required level
  if (playerLevel < recipe.requiredLevel) {
    return false;
  }

  // Check if player has all required ingredients
  return recipe.ingredients.every((ingredient) =>
    hasEnoughItems(inventory, ingredient.itemId, ingredient.quantity)
  );
};

export const getAvailableCrafts = (
  recipes: Recipe[],
  inventory: Inventory,
  playerLevel: number
): Recipe[] => {
  return recipes.filter((recipe) =>
    canCraftRecipe(recipe, inventory, playerLevel)
  );
};

export const getMissingIngredients = (
  recipe: Recipe,
  inventory: Inventory
): Array<{
  itemId: string;
  required: number;
  available: number;
  missing: number;
}> => {
  return recipe.ingredients
    .map((ingredient) => {
      const available = inventory.slots
        .filter((slot) => slot.item?.id === ingredient.itemId)
        .reduce((total, slot) => total + slot.quantity, 0);

      return {
        itemId: ingredient.itemId,
        required: ingredient.quantity,
        available,
        missing: Math.max(0, ingredient.quantity - available),
      };
    })
    .filter((ingredient) => ingredient.missing > 0);
};

export const calculateCraftingProgress = (
  startTime: number,
  craftingTime: number
): number => {
  const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
  return Math.min(100, (elapsed / craftingTime) * 100);
};

export const isCraftingComplete = (
  startTime: number,
  craftingTime: number
): boolean => {
  const elapsed = (Date.now() - startTime) / 1000;
  return elapsed >= craftingTime;
};

export const formatCraftingTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};
