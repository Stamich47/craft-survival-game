// Import all sprite images as constants first
const sprite_000 = require("./sprites/sprite_000.png");
const sprite_001 = require("./sprites/sprite_001.png");
const sprite_002 = require("./sprites/sprite_002.png");
const sprite_003 = require("./sprites/sprite_003.png");
const sprite_004 = require("./sprites/sprite_004.png");
const sprite_005 = require("./sprites/sprite_005.png");
const sprite_006 = require("./sprites/sprite_006.png");
const sprite_007 = require("./sprites/sprite_007.png");
const sprite_011 = require("./sprites/sprite_011.png");
const sprite_012 = require("./sprites/sprite_012.png");
const sprite_013 = require("./sprites/sprite_013.png");

// Sprite mapping from the resources_basic.png sprite sheet
// 11x11 grid (121 total sprites), each 24x24 pixels
// Sprites are numbered from 0-120, left to right, top to bottom

export const SPRITE_MAPPING = {
  // Row 0 (sprites 0-10) - Basic Wood Materials
  wood: sprite_000, // Wood
  wooden_plank: sprite_001, // Wooden Planks
  stick: sprite_002, // Stick
  bone: sprite_003, // Bone
  coal: sprite_004, // Coal
  loam: sprite_005, // Loam
  hardwood: sprite_006, // Hardwood
  hardwood_plank: sprite_007, // Hardwood Plank
  ancient_wood: require("./sprites/sprite_008.png"), // Ancient Wood
  ancient_wood_plank: require("./sprites/sprite_009.png"), // Ancient Wood Planks
  sprite_010: require("./sprites/sprite_010.png"), // Empty slot

  // Row 1 (sprites 11-21) - Stone Materials
  sandstone: sprite_011, // Sandstone
  fieldstone: sprite_012, // Fieldstone
  granite: sprite_013, // Granite
  limestone: require("./sprites/sprite_014.png"), // Limestone
  marble: require("./sprites/sprite_015.png"), // Marble
  loam_bricks: require("./sprites/sprite_016.png"), // Loam Bricks
  reddish_stone: require("./sprites/sprite_017.png"), // Unnamed Reddish Stone
  golden_stone: require("./sprites/sprite_018.png"), // Unnamed Golden Stone
  dark_stone: require("./sprites/sprite_019.png"), // Unnamed Dark Stone
  sprite_020: require("./sprites/sprite_020.png"), // Empty slot
  sprite_021: require("./sprites/sprite_021.png"), // Empty slot

  // Row 2 (sprites 22-32) - Gems & Precious Stones
  ruby: require("./sprites/sprite_022.png"), // Ruby
  fire_opal: require("./sprites/sprite_023.png"), // Fire Opal
  emerald: require("./sprites/sprite_024.png"), // Emerald
  amethyst: require("./sprites/sprite_025.png"), // Amethyst
  garnet_uncut: require("./sprites/sprite_026.png"), // Garnet (Uncut)
  sapphire_uncut: require("./sprites/sprite_027.png"), // Sapphire (Uncut)
  sapphire_cut: require("./sprites/sprite_028.png"), // Sapphire (Cut)
  magenta_ruby: require("./sprites/sprite_029.png"), // Magenta Ruby
  ruby_uncut: require("./sprites/sprite_030.png"), // Ruby (Uncut)
  sprite_031: require("./sprites/sprite_031.png"), // Empty slot
  sprite_032: require("./sprites/sprite_032.png"), // Empty slot

  // Row 3 (sprites 33-43) - Ores & Coins
  gold_ore: require("./sprites/sprite_033.png"), // Gold Ore
  silver_ore: require("./sprites/sprite_034.png"), // Silver Ore
  copper_ore: require("./sprites/sprite_035.png"), // Copper Ore
  tin_ore: require("./sprites/sprite_036.png"), // Tin Ore
  iron_ore: require("./sprites/sprite_037.png"), // Iron Ore
  malachite_ore: require("./sprites/sprite_038.png"), // Malachite Ore (turns to copper if smelted)
  red_ore: require("./sprites/sprite_039.png"), // Unnamed Red Ore
  green_ore: require("./sprites/sprite_040.png"), // Unnamed Green Ore
  brown_ore: require("./sprites/sprite_041.png"), // Unnamed Brown Ore
  copper_coin: require("./sprites/sprite_042.png"), // Copper Coin
  sprite_043: require("./sprites/sprite_043.png"), // Empty slot

  // Row 4 (sprites 44-54) - Metal Chunks
  gold_chunk: require("./sprites/sprite_044.png"), // Chunk of Gold
  silver_chunk: require("./sprites/sprite_045.png"), // Chunk of Silver
  copper_chunk: require("./sprites/sprite_046.png"), // Chunk of Copper
  bronze_chunk: require("./sprites/sprite_047.png"), // Chunk of Bronze (Tin + Copper)
  iron_chunk: require("./sprites/sprite_048.png"), // Chunk of Iron
  polished_malachite: require("./sprites/sprite_049.png"), // Polished Malachite
  red_metal_chunk: require("./sprites/sprite_050.png"), // Chunk of Unnamed Red Metal
  green_metal_chunk: require("./sprites/sprite_051.png"), // Chunk of Unnamed Green Metal
  brown_metal_chunk: require("./sprites/sprite_052.png"), // Chunk of Unnamed Brown Metal
  silver_coin: require("./sprites/sprite_053.png"), // Silver Coin
  sprite_054: require("./sprites/sprite_054.png"), // Empty slot

  // Row 5 (sprites 55-65) - Ingots & Gold Coin
  gold_ingot: require("./sprites/sprite_055.png"), // Gold Ingot
  silver_ingot: require("./sprites/sprite_056.png"), // Silver Ingot
  copper_ingot: require("./sprites/sprite_057.png"), // Copper Ingot
  bronze_ingot: require("./sprites/sprite_058.png"), // Bronze Ingot
  iron_ingot: require("./sprites/sprite_059.png"), // Iron Ingot
  steel_ingot: require("./sprites/sprite_060.png"), // Steel Ingot (Iron + Coal)
  red_ingot: require("./sprites/sprite_061.png"), // Unnamed Red Ingot
  green_ingot: require("./sprites/sprite_062.png"), // Unnamed Green Ingot
  brown_ingot: require("./sprites/sprite_063.png"), // Unnamed Brown Ingot
  gold_coin: require("./sprites/sprite_064.png"), // Gold Coin
  sprite_065: require("./sprites/sprite_065.png"), // Empty slot

  // Row 6 (sprites 66-76) - Food & Agricultural Products
  mushrooms: require("./sprites/sprite_066.png"), // Mushrooms
  pepper: require("./sprites/sprite_067.png"), // Pepper
  apple: require("./sprites/sprite_068.png"), // Apple
  wheat: require("./sprites/sprite_069.png"), // Wheat
  flour: require("./sprites/sprite_070.png"), // Flour
  bread: require("./sprites/sprite_071.png"), // Bread
  milk: require("./sprites/sprite_072.png"), // Milk
  egg: require("./sprites/sprite_073.png"), // Egg
  fibers: require("./sprites/sprite_074.png"), // Fibers
  strawberry_milk: require("./sprites/sprite_075.png"), // Strawberry Milk
  chocolate_milk: require("./sprites/sprite_076.png"), // Chocolate Milk

  // Row 7 (sprites 77-87) - Food & Animal Products
  honey: require("./sprites/sprite_077.png"), // Honey
  beef: require("./sprites/sprite_078.png"), // Beef
  fish: require("./sprites/sprite_079.png"), // Fish
  pork: require("./sprites/sprite_080.png"), // Pork
  sausage: require("./sprites/sprite_081.png"), // Sausage
  heart: require("./sprites/sprite_082.png"), // Heart
  feathers: require("./sprites/sprite_083.png"), // Feathers
  sprite_084: require("./sprites/sprite_084.png"), // Empty slot
  sprite_085: require("./sprites/sprite_085.png"), // Empty slot
  sprite_086: require("./sprites/sprite_086.png"), // Empty slot
  sprite_087: require("./sprites/sprite_087.png"), // Empty slot

  // Row 8 (sprites 88-98) - Animal Hides
  sheep_wool: require("./sprites/sprite_088.png"), // Sheep Wool
  brown_bear_hide: require("./sprites/sprite_089.png"), // Brown Bear Hide
  black_bear_hide: require("./sprites/sprite_090.png"), // Black Bear Hide
  wolf_hide: require("./sprites/sprite_091.png"), // Wolf Hide
  deer_hide: require("./sprites/sprite_092.png"), // Deer Hide
  tiger_hide: require("./sprites/sprite_093.png"), // Tiger Hide
  arctic_bear_hide: require("./sprites/sprite_094.png"), // Arctic Bear Hide
  arctic_deer_hide: require("./sprites/sprite_095.png"), // Arctic Deer Hide
  arctic_wolf_hide: require("./sprites/sprite_096.png"), // Arctic Wolf Hide
  golden_bear_hide: require("./sprites/sprite_097.png"), // Golden Bear Hide
  golden_wolf_hide: require("./sprites/sprite_098.png"), // Golden Wolf Hide

  // Row 9 (sprites 99-109) - Plants & Herbs
  hops: require("./sprites/sprite_099.png"), // Hops
  herbs_1: require("./sprites/sprite_100.png"), // Herbs #1
  herbs_2: require("./sprites/sprite_101.png"), // Herbs #2
  herbs_3: require("./sprites/sprite_102.png"), // Herbs #3
  herbs_4: require("./sprites/sprite_103.png"), // Herbs #4
  cotton: require("./sprites/sprite_104.png"), // Cotton
  herbs_5: require("./sprites/sprite_105.png"), // Herbs #5
  sprite_106: require("./sprites/sprite_106.png"), // Empty slot
  sprite_107: require("./sprites/sprite_107.png"), // Empty slot
  sprite_108: require("./sprites/sprite_108.png"), // Empty slot
  sprite_109: require("./sprites/sprite_109.png"), // Empty slot

  // Row 10 (sprites 110-120) - Potions & Bottles
  large_red_potion: require("./sprites/sprite_110.png"), // Large Red Potion
  small_red_potion: require("./sprites/sprite_111.png"), // Small Red Potion
  large_blue_potion: require("./sprites/sprite_112.png"), // Large Blue Potion
  small_blue_potion: require("./sprites/sprite_113.png"), // Small Blue Potion
  large_green_potion: require("./sprites/sprite_114.png"), // Large Green Potion
  small_green_potion: require("./sprites/sprite_115.png"), // Small Green Potion
  large_purple_potion: require("./sprites/sprite_116.png"), // Large Purple Potion
  small_purple_potion: require("./sprites/sprite_117.png"), // Small Purple Potion
  large_empty_bottle: require("./sprites/sprite_118.png"), // Large Empty Bottle
  small_empty_bottle: require("./sprites/sprite_119.png"), // Small Empty Bottle
  empty_milk_bottle: require("./sprites/sprite_120.png"), // Empty Milk Bottle
};

// Weapon sprites from weapons.png sprite sheet
// 4 rows x 5 weapons (20 total), each 32x32 pixels
// Tiers: Wooden (custom), Copper (row 1), Silver (row 2), Gold (row 3), Diamond (row 4)
// Tools: Sword, Shovel, Pickaxe, Axe, Scythe (columns 1-5)
export const WEAPON_SPRITE_MAPPING = {
  // Wooden tier weapons (Custom wooden variants)
  wooden_sword: require("./weapons/wooden_sword.png"),
  wooden_pickaxe: require("./weapons/wooden_pickaxe.png"),
  wooden_axe: require("./weapons/wooden_axe.png"),

  // Copper tier weapons (Row 1)
  copper_sword: require("./weapons/weapon_000.png"),
  copper_shovel: require("./weapons/weapon_001.png"),
  copper_pickaxe: require("./weapons/weapon_002.png"),
  copper_axe: require("./weapons/weapon_003.png"),
  copper_scythe: require("./weapons/weapon_004.png"),

  // Silver tier weapons (Row 2)
  silver_sword: require("./weapons/weapon_005.png"),
  silver_shovel: require("./weapons/weapon_006.png"),
  silver_pickaxe: require("./weapons/weapon_007.png"),
  silver_axe: require("./weapons/weapon_008.png"),
  silver_scythe: require("./weapons/weapon_009.png"),

  // Gold tier weapons (Row 3)
  gold_sword: require("./weapons/weapon_010.png"),
  gold_shovel: require("./weapons/weapon_011.png"),
  gold_pickaxe: require("./weapons/weapon_012.png"),
  gold_axe: require("./weapons/weapon_013.png"),
  gold_scythe: require("./weapons/weapon_014.png"),

  // Diamond tier weapons (Row 4)
  diamond_sword: require("./weapons/weapon_015.png"),
  diamond_shovel: require("./weapons/weapon_016.png"),
  diamond_pickaxe: require("./weapons/weapon_017.png"),
  diamond_axe: require("./weapons/weapon_018.png"),
  diamond_scythe: require("./weapons/weapon_019.png"),
};

// Helper function to get weapon sprite by name
export function getWeaponSprite(name: keyof typeof WEAPON_SPRITE_MAPPING) {
  return WEAPON_SPRITE_MAPPING[name];
}

// Helper function to get sprite by name
export function getSprite(name: keyof typeof SPRITE_MAPPING) {
  return SPRITE_MAPPING[name];
}

// Grid position calculator (if you need to reference by row/column)
export function getSpriteByPosition(row: number, col: number) {
  const spriteIndex = row * 11 + col;
  const spriteName = `sprite_${spriteIndex
    .toString()
    .padStart(3, "0")}` as keyof typeof SPRITE_MAPPING;
  return SPRITE_MAPPING[spriteName];
}
