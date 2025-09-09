import { Recipe } from "../types";

export const RECIPES: Record<string, Recipe> = {
  wooden_plank: {
    id: "wooden_plank",
    name: "Wooden Plank",
    description: "Convert wood into planks.",
    result: {
      itemId: "wooden_plank",
      quantity: 4,
    },
    ingredients: [
      {
        itemId: "wood",
        quantity: 1,
      },
    ],
    requiredLevel: 1,
    craftingTime: 2,
  },
  wooden_axe: {
    id: "wooden_axe",
    name: "Wooden Axe",
    description: "Craft a basic axe.",
    result: {
      itemId: "wooden_axe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "wooden_plank",
        quantity: 3,
      },
      {
        itemId: "wood",
        quantity: 2,
      },
    ],
    requiredLevel: 1,
    craftingTime: 5,
  },
  wooden_pickaxe: {
    id: "wooden_pickaxe",
    name: "Wooden Pickaxe",
    description: "Craft a basic pickaxe.",
    result: {
      itemId: "wooden_pickaxe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "wooden_plank",
        quantity: 3,
      },
      {
        itemId: "wood",
        quantity: 2,
      },
    ],
    requiredLevel: 1,
    craftingTime: 5,
  },
  wooden_sword: {
    id: "wooden_sword",
    name: "Wooden Sword",
    description: "Craft a basic sword.",
    result: {
      itemId: "wooden_sword",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "wooden_plank",
        quantity: 2,
      },
      {
        itemId: "wood",
        quantity: 1,
      },
    ],
    requiredLevel: 1,
    craftingTime: 4,
  },
  iron_ingot: {
    id: "iron_ingot",
    name: "Iron Ingot",
    description: "Smelt iron ore into ingots.",
    result: {
      itemId: "iron_ingot",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "iron_ore",
        quantity: 1,
      },
    ],
    requiredLevel: 3,
    craftingTime: 8,
  },
  iron_axe: {
    id: "iron_axe",
    name: "Iron Axe",
    description: "Craft a sturdy iron axe.",
    result: {
      itemId: "iron_axe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "iron_ingot",
        quantity: 3,
      },
      {
        itemId: "wood",
        quantity: 2,
      },
    ],
    requiredLevel: 5,
    craftingTime: 12,
  },
  iron_sword: {
    id: "iron_sword",
    name: "Iron Sword",
    description: "Craft a sharp iron sword.",
    result: {
      itemId: "iron_sword",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "iron_ingot",
        quantity: 2,
      },
      {
        itemId: "wood",
        quantity: 1,
      },
    ],
    requiredLevel: 4,
    craftingTime: 10,
  },
  rope: {
    id: "rope",
    name: "Rope",
    description: "Craft useful rope.",
    result: {
      itemId: "rope",
      quantity: 3,
    },
    ingredients: [
      {
        itemId: "wood",
        quantity: 1,
      },
    ],
    requiredLevel: 1,
    craftingTime: 3,
  },
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return RECIPES[id];
};

export const getAvailableRecipes = (playerLevel: number): Recipe[] => {
  return Object.values(RECIPES).filter(
    (recipe) => recipe.requiredLevel <= playerLevel
  );
};

export const getRecipesByIngredient = (itemId: string): Recipe[] => {
  return Object.values(RECIPES).filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.itemId === itemId)
  );
};
