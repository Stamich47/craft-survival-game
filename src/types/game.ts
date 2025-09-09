// Game Types for Crafting/Survival Game

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  hunger: number;
  maxHunger: number;
  thirst: number;
  maxThirst: number;
  energy: number;
  maxEnergy: number;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  stackable: boolean;
  maxStack: number;
  value: number;
  icon?: string;
}

export enum ItemType {
  RESOURCE = "RESOURCE",
  TOOL = "TOOL",
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  CONSUMABLE = "CONSUMABLE",
  CRAFTABLE = "CRAFTABLE",
}

export enum ItemRarity {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

export interface InventorySlot {
  id: string;
  item: Item | null;
  quantity: number;
}

export interface Inventory {
  slots: InventorySlot[];
  maxSlots: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  result: {
    itemId: string;
    quantity: number;
  };
  ingredients: Array<{
    itemId: string;
    quantity: number;
  }>;
  requiredLevel: number;
  craftingTime: number; // in seconds
}

export interface CraftingStation {
  id: string;
  name: string;
  recipes: string[]; // Recipe IDs
  level: number;
}

export interface GameState {
  player: Player;
  inventory: Inventory;
  discoveredRecipes: string[]; // Recipe IDs
  currentLocation: string;
  gameTime: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  gatherTime: number; // seconds
  toolRequired?: ItemType;
  minToolLevel?: number;
  yields: Array<{
    itemId: string;
    quantity: number;
    chance: number; // 0-1
  }>;
}

export enum ResourceType {
  TREE = "TREE",
  ROCK = "ROCK",
  BUSH = "BUSH",
  WATER = "WATER",
  ANIMAL = "ANIMAL",
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  level: number;
  position: Position;
  isBuilt: boolean;
  buildTime: number;
  materials: Array<{
    itemId: string;
    quantity: number;
  }>;
}

export enum BuildingType {
  SHELTER = "SHELTER",
  CRAFTING_TABLE = "CRAFTING_TABLE",
  FURNACE = "FURNACE",
  STORAGE = "STORAGE",
  FARM = "FARM",
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: Array<{
    type: "ITEM" | "EXPERIENCE" | "UNLOCK";
    value: string | number;
  }>;
  isCompleted: boolean;
  isActive: boolean;
}

export interface QuestObjective {
  id: string;
  description: string;
  type: "COLLECT" | "CRAFT" | "BUILD" | "SURVIVE";
  target: string;
  current: number;
  required: number;
  isCompleted: boolean;
}
