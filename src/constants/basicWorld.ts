// Basic World Tiles - Temporarily using placeholders
// TODO: Replace with actual assets when available

export const BASIC_TILES = {
  // Temporary placeholder - replace with actual grass.png when available
  GRASS: require("../../assets/icon.png"), // Using app icon as temporary placeholder

  // Temporary placeholder - replace with actual cliff.png when available
  CLIFF: require("../../assets/icon.png"), // Using app icon as temporary placeholder
} as const;

// Simple tile type enum for basic world
export enum BasicTileType {
  GRASS = 1000,
  CLIFF = 1001,
}

// Helper function to get tile asset
export const getBasicTileAsset = (tileType: BasicTileType) => {
  switch (tileType) {
    case BasicTileType.GRASS:
      return BASIC_TILES.GRASS;
    case BasicTileType.CLIFF:
      return BASIC_TILES.CLIFF;
    default:
      return BASIC_TILES.GRASS; // Default fallback
  }
};

// Check if a tile is collidable (cliffs block movement)
export const isBasicTileCollidable = (tileType: BasicTileType): boolean => {
  return tileType === BasicTileType.CLIFF;
};

// 6x6 World Layout - Grass with cliffs along bottom edge
export const BASIC_WORLD_LAYOUT = [
  // Row 0 (top)
  [
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
  ],
  // Row 1
  [
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
  ],
  // Row 2
  [
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
  ],
  // Row 3
  [
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
  ],
  // Row 4
  [
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
    BasicTileType.GRASS,
  ],
  // Row 5 (bottom - cliffs)
  [
    BasicTileType.CLIFF,
    BasicTileType.CLIFF,
    BasicTileType.CLIFF,
    BasicTileType.CLIFF,
    BasicTileType.CLIFF,
    BasicTileType.CLIFF,
  ],
] as const;

// World configuration
export const BASIC_WORLD_CONFIG = {
  WIDTH: 6,
  HEIGHT: 6,
  TILE_SIZE: 64,
  SPAWN_X: 2, // Character spawns in middle-ish
  SPAWN_Y: 2,
} as const;
