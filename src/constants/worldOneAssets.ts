// World One Asset Constants and Imports
// DISABLED: Using Custom World system instead
// This complex sprite sheet system has been replaced by the visual world editor approach

// Terrain Tilemaps (sprite sheets) - DISABLED
export const TERRAIN_TILEMAPS = {
  COLOR1: require("../../assets/icon.png"), // Placeholder - original system disabled
  COLOR2: require("../../assets/icon.png"), // Placeholder - original system disabled
  COLOR3: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Water Animations (12 frames each) - DISABLED
export const WATER_ANIMATIONS = {
  FLAT_GROUND_1: require("../../assets/icon.png"), // Placeholder - original system disabled
  FLAT_GROUND_2: require("../../assets/icon.png"), // Placeholder - original system disabled
  FLAT_GROUND_3: require("../../assets/icon.png"), // Placeholder - original system disabled
  FLAT_GROUND_4: require("../../assets/icon.png"), // Placeholder - original system disabled
  ELEVATION_1: require("../../assets/icon.png"), // Placeholder - original system disabled
  ELEVATION_2: require("../../assets/icon.png"), // Placeholder - original system disabled
  ELEVATION_3: require("../../assets/icon.png"), // Placeholder - original system disabled
  ELEVATION_4: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Water Background - DISABLED
export const WATER_BACKGROUND = require("../../assets/icon.png"); // Placeholder - original system disabled

// Individual Tree Assets - DISABLED
export const TREES = {
  TREE1: require("../../assets/icon.png"), // Placeholder - original system disabled
  TREE2: require("../../assets/icon.png"), // Placeholder - original system disabled
  TREE3: require("../../assets/icon.png"), // Placeholder - original system disabled
  TREE4: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Individual Bush Assets - DISABLED
export const BUSHES = {
  BUSH1: require("../../assets/icon.png"), // Placeholder - original system disabled
  BUSH2: require("../../assets/icon.png"), // Placeholder - original system disabled
  BUSH3: require("../../assets/icon.png"), // Placeholder - original system disabled
  BUSH4: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Individual Rock Assets - DISABLED
export const ROCKS = {
  ROCK1: require("../../assets/icon.png"), // Placeholder - original system disabled
  ROCK2: require("../../assets/icon.png"), // Placeholder - original system disabled
  ROCK3: require("../../assets/icon.png"), // Placeholder - original system disabled
  ROCK4: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Sheep Assets (different naming pattern) - DISABLED
export const SHEEP = {
  SHEEP1: require("../../assets/icon.png"), // Placeholder - original system disabled
  SHEEP2: require("../../assets/icon.png"), // Placeholder - original system disabled
  SHEEP3: require("../../assets/icon.png"), // Placeholder - original system disabled
  SHEEP4: require("../../assets/icon.png"), // Placeholder - original system disabled
} as const;

// Sprite Configuration
export const SPRITE_CONFIG = {
  // Standard tile size for terrain (assuming square tiles)
  TERRAIN_TILE_SIZE: 64, // pixels - will need to adjust based on actual tilemap

  // Animation configuration
  WATER_FRAME_COUNT: 12,
  WATER_ANIMATION_SPEED: 200, // milliseconds per frame

  // Collision settings
  COLLIDABLE_DECORATIONS: ["TREE", "BUSH", "ROCK"],

  // Decoration sizes (estimated - will need to measure actual assets)
  DECORATION_SIZES: {
    TREE: { width: 64, height: 96 }, // Trees are typically taller
    BUSH: { width: 48, height: 48 }, // Bushes are shorter
    ROCK: { width: 40, height: 40 }, // Rocks are small
    SHEEP: { width: 32, height: 32 }, // Sheep are small
  },
} as const;

// World One Specific Tile Types (extending the base TileType enum)
export enum WorldOneTileType {
  // Terrain from tilemaps
  TERRAIN_COLOR1_BASE = 100,
  TERRAIN_COLOR2_BASE = 200,
  TERRAIN_COLOR3_BASE = 300,

  // Animated water
  WATER_FLAT_1 = 400,
  WATER_FLAT_2 = 401,
  WATER_FLAT_3 = 402,
  WATER_FLAT_4 = 403,
  WATER_ELEVATION_1 = 410,
  WATER_ELEVATION_2 = 411,
  WATER_ELEVATION_3 = 412,
  WATER_ELEVATION_4 = 413,

  // Individual decorations
  TREE_1 = 500,
  TREE_2 = 501,
  TREE_3 = 502,
  TREE_4 = 503,

  BUSH_1 = 600,
  BUSH_2 = 601,
  BUSH_3 = 602,
  BUSH_4 = 603,

  ROCK_1 = 700,
  ROCK_2 = 701,
  ROCK_3 = 702,
  ROCK_4 = 703,

  SHEEP_1 = 800,
  SHEEP_2 = 801,
  SHEEP_3 = 802,
  SHEEP_4 = 803,
}

// Helper function to get asset source for a tile type
export const getAssetForTileType = (tileType: WorldOneTileType) => {
  switch (tileType) {
    case WorldOneTileType.TREE_1:
      return TREES.TREE1;
    case WorldOneTileType.TREE_2:
      return TREES.TREE2;
    case WorldOneTileType.TREE_3:
      return TREES.TREE3;
    case WorldOneTileType.TREE_4:
      return TREES.TREE4;

    case WorldOneTileType.BUSH_1:
      return BUSHES.BUSH1;
    case WorldOneTileType.BUSH_2:
      return BUSHES.BUSH2;
    case WorldOneTileType.BUSH_3:
      return BUSHES.BUSH3;
    case WorldOneTileType.BUSH_4:
      return BUSHES.BUSH4;

    case WorldOneTileType.ROCK_1:
      return ROCKS.ROCK1;
    case WorldOneTileType.ROCK_2:
      return ROCKS.ROCK2;
    case WorldOneTileType.ROCK_3:
      return ROCKS.ROCK3;
    case WorldOneTileType.ROCK_4:
      return ROCKS.ROCK4;

    case WorldOneTileType.SHEEP_1:
      return SHEEP.SHEEP1;
    case WorldOneTileType.SHEEP_2:
      return SHEEP.SHEEP2;
    case WorldOneTileType.SHEEP_3:
      return SHEEP.SHEEP3;
    case WorldOneTileType.SHEEP_4:
      return SHEEP.SHEEP4;

    // Water animations - return the sprite sheet (we'll handle frame extraction separately)
    case WorldOneTileType.WATER_FLAT_1:
      return WATER_ANIMATIONS.FLAT_GROUND_1;
    case WorldOneTileType.WATER_FLAT_2:
      return WATER_ANIMATIONS.FLAT_GROUND_2;
    case WorldOneTileType.WATER_FLAT_3:
      return WATER_ANIMATIONS.FLAT_GROUND_3;
    case WorldOneTileType.WATER_FLAT_4:
      return WATER_ANIMATIONS.FLAT_GROUND_4;

    case WorldOneTileType.WATER_ELEVATION_1:
      return WATER_ANIMATIONS.ELEVATION_1;
    case WorldOneTileType.WATER_ELEVATION_2:
      return WATER_ANIMATIONS.ELEVATION_2;
    case WorldOneTileType.WATER_ELEVATION_3:
      return WATER_ANIMATIONS.ELEVATION_3;
    case WorldOneTileType.WATER_ELEVATION_4:
      return WATER_ANIMATIONS.ELEVATION_4;

    // Terrain tilemaps - we'll need additional logic for tile extraction
    default:
      if (
        tileType >= WorldOneTileType.TERRAIN_COLOR1_BASE &&
        tileType < WorldOneTileType.TERRAIN_COLOR2_BASE
      ) {
        return TERRAIN_TILEMAPS.COLOR1;
      } else if (
        tileType >= WorldOneTileType.TERRAIN_COLOR2_BASE &&
        tileType < WorldOneTileType.TERRAIN_COLOR3_BASE
      ) {
        return TERRAIN_TILEMAPS.COLOR2;
      } else if (
        tileType >= WorldOneTileType.TERRAIN_COLOR3_BASE &&
        tileType < WorldOneTileType.WATER_FLAT_1
      ) {
        return TERRAIN_TILEMAPS.COLOR3;
      }
      return null;
  }
};

// Helper function to check if a tile type is collidable
export const isTileCollidable = (tileType: WorldOneTileType): boolean => {
  return (
    (tileType >= WorldOneTileType.TREE_1 &&
      tileType <= WorldOneTileType.TREE_4) ||
    (tileType >= WorldOneTileType.BUSH_1 &&
      tileType <= WorldOneTileType.BUSH_4) ||
    (tileType >= WorldOneTileType.ROCK_1 && tileType <= WorldOneTileType.ROCK_4)
  );
};

// Helper function to check if a tile type is animated
export const isTileAnimated = (tileType: WorldOneTileType): boolean => {
  return (
    tileType >= WorldOneTileType.WATER_FLAT_1 &&
    tileType <= WorldOneTileType.WATER_ELEVATION_4
  );
};
