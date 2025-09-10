// Auto-generated world data from Visual World Editor

// Tile imports
export const WORLD_TILES = {
  GRASS_TOP_LEFT_CORNER: require("../assets/world-one/tiles/grass/grass_top_left_corner.png"),
  GRASS_TOP_MIDDLE: require("../assets/world-one/tiles/grass/grass_top_middle.png"),
  GRASS_TOP_RIGHT_CORNER: require("../assets/world-one/tiles/grass/grass_top_right_corner.png"),
  GRASS_LEFT_MIDDLE: require("../assets/world-one/tiles/grass/grass_left_middle.png"),
  GRASS: require("../assets/world-one/tiles/grass/grass.png"),
  GRASS_BOTTOM_RIGHT_CORNER: require("../assets/world-one/tiles/grass/grass_bottom_right_corner.png"),
  GRASS_RIGHT_MIDDLE: require("../assets/world-one/tiles/grass/grass_right_middle.png"),
  CLIFF_BOTTOM_RIGHT: require("../assets/world-one/tiles/cliff/cliff_bottom_right.png"),
  GRASS_BOTTOM_LEFT_CORNER: require("../assets/world-one/tiles/grass/grass_bottom_left_corner.png"),
  GRASS_BOTTOM_MIDDLE: require("../assets/world-one/tiles/grass/grass_bottom_middle.png"),
  CLIFF_BOTTOM_LEFT: require("../assets/world-one/tiles/cliff/cliff_bottom_left.png"),
  CLIFF_BOTTOM_MIDDLE: require("../assets/world-one/tiles/cliff/cliff_bottom_middle.png"),
  // Animated cliff sprites
  WATER_CLIFF_LEFT: require("../assets/world-one/sprites/water-cliff-left.png"),
  WATER_CLIFF_MIDDLE: require("../assets/world-one/sprites/water-cliff-middle.png"),
  WATER_CLIFF_RIGHTT: require("../assets/world-one/sprites/water-cliff-rightt.png"),
  // Animated tree sprites
  TREE1_SPRITE: require("../assets/world-one/sprites/tree1-sprite.png"),
  TREE3_SPRITE: require("../assets/world-one/sprites/tree3-sprite.png"),
} as const;

export enum WorldTileType {
  GRASS_TOP_LEFT_CORNER = 1000,
  GRASS_TOP_MIDDLE = 1001,
  GRASS_TOP_RIGHT_CORNER = 1002,
  GRASS_LEFT_MIDDLE = 1003,
  GRASS = 1004,
  GRASS_BOTTOM_RIGHT_CORNER = 1005,
  GRASS_RIGHT_MIDDLE = 1006,
  CLIFF_BOTTOM_RIGHT = 1007,
  GRASS_BOTTOM_LEFT_CORNER = 1008,
  GRASS_BOTTOM_MIDDLE = 1009,
  CLIFF_BOTTOM_LEFT = 1010,
  CLIFF_BOTTOM_MIDDLE = 1011,
  // Animated cliff tiles
  WATER_CLIFF_LEFT = 1012,
  WATER_CLIFF_MIDDLE = 1013,
  WATER_CLIFF_RIGHTT = 1014,
  // Animated tree tiles
  TREE1_SPRITE = 1015,
  TREE3_SPRITE = 1016,
}

// 6x6 World Layout (Base Layer)
export const CUSTOM_WORLD_LAYOUT = [
  // Row 0
  [
    WorldTileType.GRASS_TOP_LEFT_CORNER,
    WorldTileType.GRASS_TOP_MIDDLE,
    WorldTileType.GRASS_TOP_MIDDLE,
    WorldTileType.GRASS_TOP_MIDDLE,
    WorldTileType.GRASS_TOP_MIDDLE,
    WorldTileType.GRASS_TOP_RIGHT_CORNER,
  ],
  // Row 1
  [
    WorldTileType.GRASS_LEFT_MIDDLE,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS_BOTTOM_RIGHT_CORNER,
  ],
  // Row 2
  [
    WorldTileType.GRASS_LEFT_MIDDLE,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS_RIGHT_MIDDLE,
    WorldTileType.WATER_CLIFF_RIGHTT,
  ],
  // Row 3
  [
    WorldTileType.GRASS_LEFT_MIDDLE,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS,
    WorldTileType.GRASS_TOP_RIGHT_CORNER,
  ],
  // Row 4
  [
    WorldTileType.GRASS_BOTTOM_LEFT_CORNER,
    WorldTileType.GRASS_BOTTOM_MIDDLE,
    WorldTileType.GRASS_BOTTOM_MIDDLE,
    WorldTileType.GRASS_BOTTOM_MIDDLE,
    WorldTileType.GRASS_BOTTOM_MIDDLE,
    WorldTileType.GRASS_BOTTOM_RIGHT_CORNER,
  ],
  // Row 5
  [
    WorldTileType.WATER_CLIFF_LEFT,
    WorldTileType.WATER_CLIFF_MIDDLE,
    WorldTileType.WATER_CLIFF_MIDDLE,
    WorldTileType.WATER_CLIFF_MIDDLE,
    WorldTileType.WATER_CLIFF_MIDDLE,
    WorldTileType.WATER_CLIFF_RIGHTT,
  ],
] as const;

export const getWorldTileAsset = (tileType: WorldTileType) => {
  switch (tileType) {
    case WorldTileType.GRASS_TOP_LEFT_CORNER:
      return WORLD_TILES.GRASS_TOP_LEFT_CORNER;
    case WorldTileType.GRASS_TOP_MIDDLE:
      return WORLD_TILES.GRASS_TOP_MIDDLE;
    case WorldTileType.GRASS_TOP_RIGHT_CORNER:
      return WORLD_TILES.GRASS_TOP_RIGHT_CORNER;
    case WorldTileType.GRASS_LEFT_MIDDLE:
      return WORLD_TILES.GRASS_LEFT_MIDDLE;
    case WorldTileType.GRASS:
      return WORLD_TILES.GRASS;
    case WorldTileType.GRASS_BOTTOM_RIGHT_CORNER:
      return WORLD_TILES.GRASS_BOTTOM_RIGHT_CORNER;
    case WorldTileType.GRASS_RIGHT_MIDDLE:
      return WORLD_TILES.GRASS_RIGHT_MIDDLE;
    case WorldTileType.CLIFF_BOTTOM_RIGHT:
      return WORLD_TILES.CLIFF_BOTTOM_RIGHT;
    case WorldTileType.GRASS_BOTTOM_LEFT_CORNER:
      return WORLD_TILES.GRASS_BOTTOM_LEFT_CORNER;
    case WorldTileType.GRASS_BOTTOM_MIDDLE:
      return WORLD_TILES.GRASS_BOTTOM_MIDDLE;
    case WorldTileType.CLIFF_BOTTOM_LEFT:
      return WORLD_TILES.CLIFF_BOTTOM_LEFT;
    case WorldTileType.CLIFF_BOTTOM_MIDDLE:
      return WORLD_TILES.CLIFF_BOTTOM_MIDDLE;
    case WorldTileType.WATER_CLIFF_LEFT:
      return WORLD_TILES.WATER_CLIFF_LEFT;
    case WorldTileType.WATER_CLIFF_MIDDLE:
      return WORLD_TILES.WATER_CLIFF_MIDDLE;
    case WorldTileType.WATER_CLIFF_RIGHTT:
      return WORLD_TILES.WATER_CLIFF_RIGHTT;
    case WorldTileType.TREE1_SPRITE:
      return WORLD_TILES.TREE1_SPRITE;
    case WorldTileType.TREE3_SPRITE:
      return WORLD_TILES.TREE3_SPRITE;
    default:
      return null;
  }
};

// 6x6 World Overlay Layer (Trees, decorations, animated objects)
// null = no overlay, WorldTileType = animated sprite on top of base tile
export const CUSTOM_WORLD_OVERLAY: (WorldTileType | null)[][] = [
  // Row 0 - Add trees on grass
  [
    null,
    WorldTileType.TREE1_SPRITE,
    null,
    WorldTileType.TREE3_SPRITE,
    null,
    null,
  ],
  // Row 1
  [null, null, null, null, null, null],
  // Row 2
  [null, null, WorldTileType.TREE1_SPRITE, null, null, null],
  // Row 3
  [null, null, null, null, null, null],
  // Row 4
  [
    null,
    WorldTileType.TREE3_SPRITE,
    null,
    null,
    WorldTileType.TREE1_SPRITE,
    null,
  ],
  // Row 5 - Water cliff edges
  [null, null, null, null, null, null],
];

export const CUSTOM_WORLD_CONFIG = {
  WIDTH: 6,
  HEIGHT: 6,
  TILE_SIZE: 64,
  SPAWN_X: 2,
  SPAWN_Y: 2,
} as const;

// Collision detection helper
export const isCliffTile = (tileType: WorldTileType): boolean => {
  return (
    tileType === WorldTileType.CLIFF_BOTTOM_LEFT ||
    tileType === WorldTileType.CLIFF_BOTTOM_MIDDLE ||
    tileType === WorldTileType.CLIFF_BOTTOM_RIGHT ||
    tileType === WorldTileType.WATER_CLIFF_LEFT ||
    tileType === WorldTileType.WATER_CLIFF_MIDDLE ||
    tileType === WorldTileType.WATER_CLIFF_RIGHTT
  );
};

// Check if tile is animated
export const isAnimatedTile = (tileType: WorldTileType): boolean => {
  return (
    tileType === WorldTileType.WATER_CLIFF_LEFT ||
    tileType === WorldTileType.WATER_CLIFF_MIDDLE ||
    tileType === WorldTileType.WATER_CLIFF_RIGHTT ||
    tileType === WorldTileType.TREE1_SPRITE ||
    tileType === WorldTileType.TREE3_SPRITE
  );
};

// Get tile at position
export const getTileAtPosition = (
  x: number,
  y: number
): WorldTileType | null => {
  if (
    x < 0 ||
    x >= CUSTOM_WORLD_CONFIG.WIDTH ||
    y < 0 ||
    y >= CUSTOM_WORLD_CONFIG.HEIGHT
  ) {
    return null;
  }
  return CUSTOM_WORLD_LAYOUT[y][x];
};

// Get overlay tile at position
export const getOverlayAtPosition = (
  x: number,
  y: number
): WorldTileType | null => {
  if (
    x < 0 ||
    x >= CUSTOM_WORLD_CONFIG.WIDTH ||
    y < 0 ||
    y >= CUSTOM_WORLD_CONFIG.HEIGHT
  ) {
    return null;
  }
  return CUSTOM_WORLD_OVERLAY[y][x];
};

// Check if position has an overlay (for collision detection)
export const hasOverlayAtPosition = (x: number, y: number): boolean => {
  const overlay = getOverlayAtPosition(x, y);
  return overlay !== null;
};
