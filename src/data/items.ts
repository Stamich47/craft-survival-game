import { Item, ItemType, ItemRarity } from "../types";

export const ITEMS: Record<string, Item> = {
  // Resources
  wood: {
    id: "wood",
    name: "Wood",
    description: "Basic wooden material, useful for crafting.",
    type: ItemType.RESOURCE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 50,
    value: 1,
  },
  stone: {
    id: "stone",
    name: "Stone",
    description: "Hard stone material for construction.",
    type: ItemType.RESOURCE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 50,
    value: 2,
  },
  iron_ore: {
    id: "iron_ore",
    name: "Iron Ore",
    description: "Raw iron that can be smelted.",
    type: ItemType.RESOURCE,
    rarity: ItemRarity.UNCOMMON,
    stackable: true,
    maxStack: 30,
    value: 5,
  },
  berries: {
    id: "berries",
    name: "Berries",
    description: "Sweet berries that restore hunger.",
    type: ItemType.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 20,
    value: 3,
  },
  water: {
    id: "water",
    name: "Water",
    description: "Clean water that restores thirst.",
    type: ItemType.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 10,
    value: 2,
  },

  // Tools
  wooden_axe: {
    id: "wooden_axe",
    name: "Wooden Axe",
    description: "A basic axe for chopping trees.",
    type: ItemType.TOOL,
    rarity: ItemRarity.COMMON,
    stackable: false,
    maxStack: 1,
    value: 15,
  },
  wooden_pickaxe: {
    id: "wooden_pickaxe",
    name: "Wooden Pickaxe",
    description: "A basic pickaxe for mining stone.",
    type: ItemType.TOOL,
    rarity: ItemRarity.COMMON,
    stackable: false,
    maxStack: 1,
    value: 15,
  },
  iron_axe: {
    id: "iron_axe",
    name: "Iron Axe",
    description: "A sturdy axe made of iron.",
    type: ItemType.TOOL,
    rarity: ItemRarity.UNCOMMON,
    stackable: false,
    maxStack: 1,
    value: 50,
  },

  // Weapons
  wooden_sword: {
    id: "wooden_sword",
    name: "Wooden Sword",
    description: "A basic sword for combat.",
    type: ItemType.WEAPON,
    rarity: ItemRarity.COMMON,
    stackable: false,
    maxStack: 1,
    value: 20,
  },
  iron_sword: {
    id: "iron_sword",
    name: "Iron Sword",
    description: "A sharp iron sword.",
    type: ItemType.WEAPON,
    rarity: ItemRarity.UNCOMMON,
    stackable: false,
    maxStack: 1,
    value: 75,
  },

  // Craftables
  wooden_plank: {
    id: "wooden_plank",
    name: "Wooden Plank",
    description: "Processed wood plank for building.",
    type: ItemType.CRAFTABLE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 50,
    value: 2,
  },
  iron_ingot: {
    id: "iron_ingot",
    name: "Iron Ingot",
    description: "Smelted iron ready for crafting.",
    type: ItemType.CRAFTABLE,
    rarity: ItemRarity.UNCOMMON,
    stackable: true,
    maxStack: 20,
    value: 10,
  },
  rope: {
    id: "rope",
    name: "Rope",
    description: "Useful rope for various crafting recipes.",
    type: ItemType.CRAFTABLE,
    rarity: ItemRarity.COMMON,
    stackable: true,
    maxStack: 25,
    value: 5,
  },
};

export const getItemById = (id: string): Item | undefined => {
  return ITEMS[id];
};

export const getItemsByType = (type: ItemType): Item[] => {
  return Object.values(ITEMS).filter((item) => item.type === type);
};

export const getItemsByRarity = (rarity: ItemRarity): Item[] => {
  return Object.values(ITEMS).filter((item) => item.rarity === rarity);
};
