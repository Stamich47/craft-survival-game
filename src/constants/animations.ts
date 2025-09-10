// Animation system for reusable sprite animations

export interface AnimationFrame {
  tileX: number;
  tileY: number;
}

export interface AnimationData {
  name: string;
  frameCount: number;
  frameDuration: number;
  tileSize: number;
  frames: AnimationFrame[];
  spriteSheet?: any; // Will be set when loaded
}

// Import your cliff_water animation data
export const CLIFF_WATER_LEFT_ANIMATION: AnimationData = {
  name: "cliff_water_left",
  frameCount: 12,
  frameDuration: 100,
  tileSize: 64,
  frames: [
    { tileX: 0, tileY: 0 },
    { tileX: 1, tileY: 0 },
    { tileX: 2, tileY: 0 },
    { tileX: 3, tileY: 0 },
    { tileX: 4, tileY: 0 },
    { tileX: 5, tileY: 0 },
    { tileX: 6, tileY: 0 },
    { tileX: 7, tileY: 0 },
    { tileX: 8, tileY: 0 },
    { tileX: 9, tileY: 0 },
    { tileX: 10, tileY: 0 },
    { tileX: 11, tileY: 0 },
  ],
  spriteSheet: require("../assets/world-one/sprites/water-cliff-left.png"),
};

export const CLIFF_WATER_MIDDLE_ANIMATION: AnimationData = {
  name: "cliff_water_middle",
  frameCount: 12,
  frameDuration: 100,
  tileSize: 64,
  frames: [
    { tileX: 0, tileY: 0 },
    { tileX: 1, tileY: 0 },
    { tileX: 2, tileY: 0 },
    { tileX: 3, tileY: 0 },
    { tileX: 4, tileY: 0 },
    { tileX: 5, tileY: 0 },
    { tileX: 6, tileY: 0 },
    { tileX: 7, tileY: 0 },
    { tileX: 8, tileY: 0 },
    { tileX: 9, tileY: 0 },
    { tileX: 10, tileY: 0 },
    { tileX: 11, tileY: 0 },
  ],
  spriteSheet: require("../assets/world-one/sprites/water-cliff-middle.png"),
};

export const CLIFF_WATER_RIGHT_ANIMATION: AnimationData = {
  name: "cliff_water_right",
  frameCount: 12,
  frameDuration: 100,
  tileSize: 64,
  frames: [
    { tileX: 0, tileY: 0 },
    { tileX: 1, tileY: 0 },
    { tileX: 2, tileY: 0 },
    { tileX: 3, tileY: 0 },
    { tileX: 4, tileY: 0 },
    { tileX: 5, tileY: 0 },
    { tileX: 6, tileY: 0 },
    { tileX: 7, tileY: 0 },
    { tileX: 8, tileY: 0 },
    { tileX: 9, tileY: 0 },
    { tileX: 10, tileY: 0 },
    { tileX: 11, tileY: 0 },
  ],
  spriteSheet: require("../assets/world-one/sprites/water-cliff-rightt.png"),
};

export const CLIFF_WATER_RIGHTT_ANIMATION: AnimationData = {
  name: "cliff_water_rightt",
  frameCount: 12,
  frameDuration: 100,
  tileSize: 64,
  frames: [
    { tileX: 0, tileY: 0 },
    { tileX: 1, tileY: 0 },
    { tileX: 2, tileY: 0 },
    { tileX: 3, tileY: 0 },
    { tileX: 4, tileY: 0 },
    { tileX: 5, tileY: 0 },
    { tileX: 6, tileY: 0 },
    { tileX: 7, tileY: 0 },
    { tileX: 8, tileY: 0 },
    { tileX: 9, tileY: 0 },
    { tileX: 10, tileY: 0 },
    { tileX: 11, tileY: 0 },
  ],
  spriteSheet: require("../assets/world-one/sprites/water-cliff-rightt.png"),
};

// Map tile types to animations
export const TILE_ANIMATIONS = {
  WATER_CLIFF_LEFT: CLIFF_WATER_LEFT_ANIMATION,
  WATER_CLIFF_MIDDLE: CLIFF_WATER_MIDDLE_ANIMATION,
  WATER_CLIFF_RIGHTT: CLIFF_WATER_RIGHTT_ANIMATION,
  // Add more tile types that use animations
};

// Animation registry for easy access
export const getAnimationForTile = (tileType: string): AnimationData | null => {
  return TILE_ANIMATIONS[tileType as keyof typeof TILE_ANIMATIONS] || null;
};
