// Sprite Clipping and Management Utilities
// Handles extracting individual tiles from sprite sheets and managing sprite positioning

import { Dimensions } from "react-native";
import { WorldOneTileType } from "../constants/worldOneAssets";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Tilemap Configuration
// These values will need to be adjusted based on the actual sprite sheet dimensions
export const TILEMAP_CONFIG = {
  COLOR1_TILEMAP: {
    tilesPerRow: 8,
    tilesPerColumn: 8,
    tileWidth: 64,
    tileHeight: 64,
  },
  COLOR2_TILEMAP: {
    tilesPerRow: 8,
    tilesPerColumn: 8,
    tileWidth: 64,
    tileHeight: 64,
  },
  COLOR3_TILEMAP: {
    tilesPerRow: 8,
    tilesPerColumn: 8,
    tileWidth: 64,
    tileHeight: 64,
  },
} as const;

// Water Animation Configuration
export const WATER_CONFIG = {
  FRAME_COUNT: 12,
  FRAME_WIDTH: 64, // Assuming square water tiles
  FRAME_HEIGHT: 64,
  ANIMATION_SPEED: 200, // ms per frame
} as const;

// Convert 2D tile coordinates to isometric screen coordinates
export const tileToIso = (x: number, y: number, tileSize: number) => {
  const isoX = (x - y) * (tileSize / 2);
  const isoY = (x + y) * (tileSize / 4);
  return { x: isoX, y: isoY };
};

// Get tile index from WorldOneTileType for tilemap extraction
export const getTileIndex = (
  tileType: WorldOneTileType
): { tileIndex: number; tilemapType: string } | null => {
  if (
    tileType >= WorldOneTileType.TERRAIN_COLOR1_BASE &&
    tileType < WorldOneTileType.TERRAIN_COLOR2_BASE
  ) {
    return {
      tileIndex: tileType - WorldOneTileType.TERRAIN_COLOR1_BASE,
      tilemapType: "COLOR1",
    };
  } else if (
    tileType >= WorldOneTileType.TERRAIN_COLOR2_BASE &&
    tileType < WorldOneTileType.TERRAIN_COLOR3_BASE
  ) {
    return {
      tileIndex: tileType - WorldOneTileType.TERRAIN_COLOR2_BASE,
      tilemapType: "COLOR2",
    };
  } else if (
    tileType >= WorldOneTileType.TERRAIN_COLOR3_BASE &&
    tileType < WorldOneTileType.WATER_FLAT_1
  ) {
    return {
      tileIndex: tileType - WorldOneTileType.TERRAIN_COLOR3_BASE,
      tilemapType: "COLOR3",
    };
  }

  return null; // Not a tilemap tile
};

// Calculate sprite position within a tilemap
export const getTilePositionInTilemap = (
  tileIndex: number,
  tilemapConfig: { tilesPerRow: number; tileWidth: number; tileHeight: number }
): { sourceX: number; sourceY: number } => {
  const row = Math.floor(tileIndex / tilemapConfig.tilesPerRow);
  const col = tileIndex % tilemapConfig.tilesPerRow;

  return {
    sourceX: col * tilemapConfig.tileWidth,
    sourceY: row * tilemapConfig.tileHeight,
  };
};

// Get current frame for animated water tiles
export const getWaterFrame = (
  tileType: WorldOneTileType,
  timestamp: number
): number => {
  if (
    tileType < WorldOneTileType.WATER_FLAT_1 ||
    tileType > WorldOneTileType.WATER_ELEVATION_4
  ) {
    return 0; // Not a water tile
  }

  // Each water tile animates independently with a slight offset for variety
  const tileOffset = (tileType - WorldOneTileType.WATER_FLAT_1) * 50; // ms offset per tile type
  const adjustedTime = timestamp + tileOffset;

  return Math.floor(
    (adjustedTime / WATER_CONFIG.ANIMATION_SPEED) % WATER_CONFIG.FRAME_COUNT
  );
};

// Calculate water sprite position for current frame
export const getWaterSpritePosition = (
  frame: number
): { sourceX: number; sourceY: number } => {
  // Assuming water frames are arranged horizontally in the sprite sheet
  return {
    sourceX: frame * WATER_CONFIG.FRAME_WIDTH,
    sourceY: 0,
  };
};

// Check if a tile type requires sprite clipping (tilemaps or animations)
export const requiresSpriteClipping = (tileType: WorldOneTileType): boolean => {
  // Tilemap tiles need clipping
  if (
    tileType >= WorldOneTileType.TERRAIN_COLOR1_BASE &&
    tileType < WorldOneTileType.WATER_FLAT_1
  ) {
    return true;
  }

  // Animated water tiles need clipping
  if (
    tileType >= WorldOneTileType.WATER_FLAT_1 &&
    tileType <= WorldOneTileType.WATER_ELEVATION_4
  ) {
    return true;
  }

  return false;
};

// Get decoration size and offset for proper positioning
export const getDecorationInfo = (tileType: WorldOneTileType) => {
  const baseSize = 48; // Base tile size for positioning

  if (
    tileType >= WorldOneTileType.TREE_1 &&
    tileType <= WorldOneTileType.TREE_4
  ) {
    return {
      width: 64,
      height: 96,
      offsetY: -24, // Trees are taller, offset upward
      isCollidable: true,
    };
  }

  if (
    tileType >= WorldOneTileType.BUSH_1 &&
    tileType <= WorldOneTileType.BUSH_4
  ) {
    return {
      width: 48,
      height: 48,
      offsetY: 0,
      isCollidable: true,
    };
  }

  if (
    tileType >= WorldOneTileType.ROCK_1 &&
    tileType <= WorldOneTileType.ROCK_4
  ) {
    return {
      width: 40,
      height: 40,
      offsetY: 4, // Rocks sit slightly lower
      isCollidable: true,
    };
  }

  if (
    tileType >= WorldOneTileType.SHEEP_1 &&
    tileType <= WorldOneTileType.SHEEP_4
  ) {
    return {
      width: 32,
      height: 32,
      offsetY: 8, // Sheep are small and sit lower
      isCollidable: false,
    };
  }

  // Default for terrain tiles
  return {
    width: baseSize,
    height: baseSize,
    offsetY: 0,
    isCollidable: false,
  };
};

// Calculate rendering depth for proper z-ordering
export const getTileDepth = (
  x: number,
  y: number,
  tileType: WorldOneTileType
): number => {
  // Base depth is tile position (back to front)
  let depth = x + y;

  // Add small offsets for different tile types to ensure proper layering
  if (
    tileType >= WorldOneTileType.TERRAIN_COLOR1_BASE &&
    tileType < WorldOneTileType.WATER_FLAT_1
  ) {
    depth += 0; // Terrain at base level
  } else if (
    tileType >= WorldOneTileType.WATER_FLAT_1 &&
    tileType <= WorldOneTileType.WATER_ELEVATION_4
  ) {
    depth += 0.1; // Water slightly above terrain
  } else if (
    tileType >= WorldOneTileType.ROCK_1 &&
    tileType <= WorldOneTileType.ROCK_4
  ) {
    depth += 0.2; // Rocks above water
  } else if (
    tileType >= WorldOneTileType.BUSH_1 &&
    tileType <= WorldOneTileType.BUSH_4
  ) {
    depth += 0.3; // Bushes above rocks
  } else if (
    tileType >= WorldOneTileType.TREE_1 &&
    tileType <= WorldOneTileType.TREE_4
  ) {
    depth += 0.4; // Trees highest
  } else if (
    tileType >= WorldOneTileType.SHEEP_1 &&
    tileType <= WorldOneTileType.SHEEP_4
  ) {
    depth += 0.35; // Sheep between bushes and trees
  }

  return depth;
};

// Screen culling - determine if a tile is visible and needs rendering
export const isTileVisible = (
  screenX: number,
  screenY: number,
  tileSize: number,
  margin: number = 100
): boolean => {
  return (
    screenX > -margin &&
    screenX < screenWidth + margin &&
    screenY > -margin &&
    screenY < screenHeight + margin
  );
};

// Performance helper - batch sprite operations
export const batchSpriteOperations = <T>(
  tiles: T[],
  operation: (tile: T) => void,
  batchSize: number = 50
): void => {
  for (let i = 0; i < tiles.length; i += batchSize) {
    const batch = tiles.slice(i, i + batchSize);
    batch.forEach(operation);
  }
};
