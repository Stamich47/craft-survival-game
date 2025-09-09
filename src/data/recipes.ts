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
    description: "Craft useful rope from plant fibers.",
    result: {
      itemId: "rope",
      quantity: 3,
    },
    ingredients: [
      {
        itemId: "fibers",
        quantity: 2,
      },
    ],
    requiredLevel: 1,
    craftingTime: 3,
  },

  // New Recipes using our sprites

  // Hardwood Processing
  hardwood_plank: {
    id: "hardwood_plank",
    name: "Hardwood Plank",
    description: "Process hardwood into strong planks.",
    result: {
      itemId: "hardwood_plank",
      quantity: 3,
    },
    ingredients: [
      {
        itemId: "hardwood",
        quantity: 1,
      },
    ],
    requiredLevel: 3,
    craftingTime: 4,
  },

  // Advanced Wood Processing
  ancient_wood_plank: {
    id: "ancient_wood_plank",
    name: "Ancient Wood Plank",
    description: "Carefully craft mystical planks from ancient wood.",
    result: {
      itemId: "ancient_wood_plank",
      quantity: 2,
    },
    ingredients: [
      {
        itemId: "ancient_wood",
        quantity: 1,
      },
    ],
    requiredLevel: 8,
    craftingTime: 15,
  },

  // Metal Smelting
  copper_ingot: {
    id: "copper_ingot",
    name: "Copper Ingot",
    description: "Smelt copper ore into ingots.",
    result: {
      itemId: "copper_ingot",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ore",
        quantity: 1,
      },
      {
        itemId: "coal",
        quantity: 1,
      },
    ],
    requiredLevel: 2,
    craftingTime: 6,
  },

  bronze_ingot: {
    id: "bronze_ingot",
    name: "Bronze Ingot",
    description: "Alloy copper and tin to create bronze.",
    result: {
      itemId: "bronze_ingot",
      quantity: 2,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 3,
      },
      {
        itemId: "tin_ore",
        quantity: 1,
      },
      {
        itemId: "coal",
        quantity: 1,
      },
    ],
    requiredLevel: 4,
    craftingTime: 10,
  },

  steel_ingot: {
    id: "steel_ingot",
    name: "Steel Ingot",
    description: "Create strong steel from iron and coal.",
    result: {
      itemId: "steel_ingot",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "iron_ingot",
        quantity: 2,
      },
      {
        itemId: "coal",
        quantity: 3,
      },
    ],
    requiredLevel: 6,
    craftingTime: 15,
  },

  gold_ingot: {
    id: "gold_ingot",
    name: "Gold Ingot",
    description: "Smelt precious gold ore.",
    result: {
      itemId: "gold_ingot",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "gold_ore",
        quantity: 2,
      },
      {
        itemId: "coal",
        quantity: 1,
      },
    ],
    requiredLevel: 7,
    craftingTime: 12,
  },

  silver_ingot: {
    id: "silver_ingot",
    name: "Silver Ingot",
    description: "Refine silver ore into ingots.",
    result: {
      itemId: "silver_ingot",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "silver_ore",
        quantity: 2,
      },
      {
        itemId: "coal",
        quantity: 1,
      },
    ],
    requiredLevel: 5,
    craftingTime: 10,
  },

  // Food Preparation
  bread: {
    id: "bread",
    name: "Bread",
    description: "Bake nutritious bread from flour.",
    result: {
      itemId: "bread",
      quantity: 2,
    },
    ingredients: [
      {
        itemId: "flour",
        quantity: 3,
      },
      {
        itemId: "milk",
        quantity: 1,
      },
    ],
    requiredLevel: 2,
    craftingTime: 8,
  },

  flour: {
    id: "flour",
    name: "Flour",
    description: "Grind wheat into flour.",
    result: {
      itemId: "flour",
      quantity: 2,
    },
    ingredients: [
      {
        itemId: "wheat",
        quantity: 3,
      },
    ],
    requiredLevel: 1,
    craftingTime: 4,
  },

  // Basic Potions
  small_red_potion: {
    id: "small_red_potion",
    name: "Small Health Potion",
    description: "Brew a basic healing potion.",
    result: {
      itemId: "small_red_potion",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "herbs_1",
        quantity: 2,
      },
      {
        itemId: "water",
        quantity: 1,
      },
    ],
    requiredLevel: 3,
    craftingTime: 10,
  },

  small_blue_potion: {
    id: "small_blue_potion",
    name: "Small Mana Potion",
    description: "Brew a basic energy potion.",
    result: {
      itemId: "small_blue_potion",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "herbs_2",
        quantity: 2,
      },
      {
        itemId: "water",
        quantity: 1,
      },
    ],
    requiredLevel: 4,
    craftingTime: 12,
  },

  // Advanced Potions
  large_red_potion: {
    id: "large_red_potion",
    name: "Large Health Potion",
    description: "Brew a powerful healing potion.",
    result: {
      itemId: "large_red_potion",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "small_red_potion",
        quantity: 3,
      },
      {
        itemId: "honey",
        quantity: 1,
      },
    ],
    requiredLevel: 6,
    craftingTime: 18,
  },

  large_blue_potion: {
    id: "large_blue_potion",
    name: "Large Mana Potion",
    description: "Brew a powerful energy potion.",
    result: {
      itemId: "large_blue_potion",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "small_blue_potion",
        quantity: 3,
      },
      {
        itemId: "honey",
        quantity: 1,
      },
    ],
    requiredLevel: 7,
    craftingTime: 20,
  },

  // COPPER TIER WEAPONS
  copper_sword: {
    id: "copper_sword",
    name: "Copper Sword",
    description: "Craft a basic copper sword for combat.",
    result: {
      itemId: "copper_sword",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 2,
      },
      {
        itemId: "stick",
        quantity: 1,
      },
    ],
    requiredLevel: 2,
    craftingTime: 8,
  },
  copper_pickaxe: {
    id: "copper_pickaxe",
    name: "Copper Pickaxe",
    description: "Craft a copper pickaxe for mining.",
    result: {
      itemId: "copper_pickaxe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 3,
      },
      {
        itemId: "stick",
        quantity: 2,
      },
    ],
    requiredLevel: 2,
    craftingTime: 10,
  },
  copper_axe: {
    id: "copper_axe",
    name: "Copper Axe",
    description: "Craft a copper axe for chopping wood.",
    result: {
      itemId: "copper_axe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 3,
      },
      {
        itemId: "stick",
        quantity: 2,
      },
    ],
    requiredLevel: 2,
    craftingTime: 10,
  },
  copper_shovel: {
    id: "copper_shovel",
    name: "Copper Shovel",
    description: "Craft a copper shovel for digging.",
    result: {
      itemId: "copper_shovel",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 1,
      },
      {
        itemId: "stick",
        quantity: 2,
      },
    ],
    requiredLevel: 2,
    craftingTime: 6,
  },
  copper_scythe: {
    id: "copper_scythe",
    name: "Copper Scythe",
    description: "Craft a copper scythe for harvesting crops.",
    result: {
      itemId: "copper_scythe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "copper_ingot",
        quantity: 2,
      },
      {
        itemId: "stick",
        quantity: 2,
      },
    ],
    requiredLevel: 2,
    craftingTime: 8,
  },

  // SILVER TIER WEAPONS
  silver_sword: {
    id: "silver_sword",
    name: "Silver Sword",
    description: "Craft a refined silver sword.",
    result: {
      itemId: "silver_sword",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "silver_ingot",
        quantity: 2,
      },
      {
        itemId: "stick",
        quantity: 1,
      },
    ],
    requiredLevel: 4,
    craftingTime: 12,
  },
  silver_pickaxe: {
    id: "silver_pickaxe",
    name: "Silver Pickaxe",
    description: "Craft a refined silver pickaxe.",
    result: {
      itemId: "silver_pickaxe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "silver_ingot",
        quantity: 3,
      },
      {
        itemId: "hardwood",
        quantity: 2,
      },
    ],
    requiredLevel: 4,
    craftingTime: 15,
  },
  silver_axe: {
    id: "silver_axe",
    name: "Silver Axe",
    description: "Craft a refined silver axe.",
    result: {
      itemId: "silver_axe",
      quantity: 1,
    },
    ingredients: [
      {
        itemId: "silver_ingot",
        quantity: 3,
      },
      {
        itemId: "hardwood",
        quantity: 2,
      },
    ],
    requiredLevel: 4,
    craftingTime: 15,
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
