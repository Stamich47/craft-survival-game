import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorldOneTileType } from "../constants/worldOneAssets";

// Tile types for 2D isometric world
export enum TileType {
  GRASS = 0,
  DIRT = 1,
  STONE = 2,
  SAND = 3,
  WATER = 4,
  TREE = 5,
  MOUNTAIN = 6,
}

// World types enum to support different world styles
export enum WorldType {
  FLAT_WORLD_ONE = "flat_world_one", // Flat world with world-one assets (legacy)
  BASIC_WORLD = "basic_world", // Simple 6x6 world with individual tiles
  WORLD_ONE = "world_one", // World One - Your 6x6 custom world from visual editor
}

// Character state
export interface Character {
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  isMoving: boolean;
}

export interface WorldState {
  tiles: number[][]; // 2D tile array
  worldSize: {
    width: number;
    height: number;
  };
  character: Character;
  camera: {
    offsetX: number;
    offsetY: number;
    zoom: number;
  };
  worldType: WorldType; // Track which world type is currently loaded
  isLoaded: boolean;
}

const initialState: WorldState = {
  tiles: [],
  worldSize: {
    width: 20,
    height: 20,
  },
  character: {
    x: 10,
    y: 10,
    isMoving: false,
  },
  camera: {
    offsetX: 0,
    offsetY: 0,
    zoom: 1,
  },
  worldType: WorldType.WORLD_ONE, // Default to World One (your custom design)
  isLoaded: true, // Custom world doesn't need generation
};

const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    // Removed procedural generateWorld - using World One and Basic worlds only

    setTile: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        type: TileType;
      }>
    ) => {
      const { x, y, type } = action.payload;
      if (
        x >= 0 &&
        x < state.worldSize.width &&
        y >= 0 &&
        y < state.worldSize.height
      ) {
        state.tiles[x][y] = type;
      }
    },

    getTile: (state, action: PayloadAction<{ x: number; y: number }>) => {
      // This reducer doesn't modify state, it's just for consistency
      // Use a selector instead for getting tile data
    },

    // Character movement actions
    moveCharacter: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;

      if (
        x >= 0 &&
        x < state.worldSize.width &&
        y >= 0 &&
        y < state.worldSize.height
      ) {
        const tileType = state.tiles[x][y];
        let isBlocked = false;

        // Check collision based on world type
        if (state.worldType === WorldType.FLAT_WORLD_ONE) {
          // For world-one, check if tile is collidable using our helper function
          // Import the helper at the top of the function if needed
          const isCollidable =
            (tileType >= WorldOneTileType.TREE_1 &&
              tileType <= WorldOneTileType.TREE_4) ||
            (tileType >= WorldOneTileType.BUSH_1 &&
              tileType <= WorldOneTileType.BUSH_4) ||
            (tileType >= WorldOneTileType.ROCK_1 &&
              tileType <= WorldOneTileType.ROCK_4) ||
            (tileType >= WorldOneTileType.WATER_FLAT_1 &&
              tileType <= WorldOneTileType.WATER_ELEVATION_4);

          isBlocked = isCollidable;
        } else if (state.worldType === WorldType.BASIC_WORLD) {
          // For basic world, check cliff collision
          const {
            BasicTileType,
            isBasicTileCollidable,
          } = require("../constants/basicWorld");
          isBlocked = isBasicTileCollidable(tileType);
        } else {
          // Original procedural world collision
          isBlocked =
            tileType === TileType.WATER || tileType === TileType.MOUNTAIN;
        }

        if (!isBlocked) {
          console.log("✅ Moved to:", x, y);
          // Move character immediately to the new position
          state.character.x = x;
          state.character.y = y;
          state.character.targetX = x;
          state.character.targetY = y;
          state.character.isMoving = false; // Not moving since we teleport instantly
        } else {
          console.log("❌ Blocked:", x, y, "(unwalkable terrain)");
        }
      } else {
        console.log("❌ Blocked:", x, y, "(out of bounds)");
      }
    },

    updateCharacterPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload;
      state.character.x = x;
      state.character.y = y;

      // Check if we reached the target
      if (state.character.targetX === x && state.character.targetY === y) {
        state.character.isMoving = false;
        state.character.targetX = undefined;
        state.character.targetY = undefined;
      }
    },

    moveCamera: (
      state,
      action: PayloadAction<{ deltaX: number; deltaY: number }>
    ) => {
      const { deltaX, deltaY } = action.payload;
      state.camera.offsetX += deltaX;
      state.camera.offsetY += deltaY;
    },

    setCameraPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload;
      state.camera.offsetX = x;
      state.camera.offsetY = y;
    },

    setZoom: (state, action: PayloadAction<number>) => {
      state.camera.zoom = Math.max(0.5, Math.min(3, action.payload));
    },

    resetWorld: (state) => {
      state.tiles = [];
      state.isLoaded = false;
      state.character = {
        x: 10,
        y: 10,
        isMoving: false,
      };
      state.camera = {
        offsetX: 0,
        offsetY: 0,
        zoom: 1,
      };
    },

    setWorldType: (state, action: PayloadAction<WorldType>) => {
      state.worldType = action.payload;
      state.isLoaded = true;

      // Set appropriate character position for World One
      if (action.payload === WorldType.WORLD_ONE) {
        state.character = {
          x: 2, // CUSTOM_WORLD_CONFIG.SPAWN_X
          y: 2, // CUSTOM_WORLD_CONFIG.SPAWN_Y
          isMoving: false,
        };
      }
    },

    generateFlatWorldOne: (
      state,
      action: PayloadAction<{ width?: number; height?: number }>
    ) => {
      const { width = 30, height = 30 } = action.payload;

      state.worldSize = { width, height };
      state.tiles = [];

      // Create a flat world with world-one assets
      for (let x = 0; x < width; x++) {
        state.tiles[x] = [];
        for (let y = 0; y < height; y++) {
          // Most tiles are grass-like terrain from color1 tilemap (base grass)
          state.tiles[x][y] = WorldOneTileType.TERRAIN_COLOR1_BASE;
        }
      }

      // Add some terrain variation using different tilemaps
      for (let i = 0; i < Math.floor(width * height * 0.1); i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        // Add some color2 and color3 terrain patches
        if (Math.random() < 0.5) {
          state.tiles[x][y] = WorldOneTileType.TERRAIN_COLOR2_BASE;
        } else {
          state.tiles[x][y] = WorldOneTileType.TERRAIN_COLOR3_BASE;
        }
      }

      // Add water features along edges and some interior spots
      const waterSpots = Math.floor(width * height * 0.08);
      for (let i = 0; i < waterSpots; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        // Prefer edges for water placement
        const isNearEdge = x < 3 || x >= width - 3 || y < 3 || y >= height - 3;
        if (isNearEdge || Math.random() < 0.3) {
          const waterType = Math.floor(Math.random() * 4);
          state.tiles[x][y] = WorldOneTileType.WATER_FLAT_1 + waterType;
        }
      }

      // Add trees (collidable obstacles)
      const treeCount = Math.floor(width * height * 0.12);
      for (let i = 0; i < treeCount; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        // Don't place trees on water
        if (state.tiles[x][y] < WorldOneTileType.WATER_FLAT_1) {
          const treeType = Math.floor(Math.random() * 4);
          state.tiles[x][y] = WorldOneTileType.TREE_1 + treeType;
        }
      }

      // Add bushes (collidable obstacles)
      const bushCount = Math.floor(width * height * 0.08);
      for (let i = 0; i < bushCount; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        // Don't place bushes on water or trees
        if (state.tiles[x][y] < WorldOneTileType.WATER_FLAT_1) {
          const bushType = Math.floor(Math.random() * 4);
          state.tiles[x][y] = WorldOneTileType.BUSH_1 + bushType;
        }
      }

      // Add rocks (collidable obstacles)
      const rockCount = Math.floor(width * height * 0.05);
      for (let i = 0; i < rockCount; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        // Don't place rocks on water, trees, or bushes
        if (state.tiles[x][y] < WorldOneTileType.WATER_FLAT_1) {
          const rockType = Math.floor(Math.random() * 4);
          state.tiles[x][y] = WorldOneTileType.ROCK_1 + rockType;
        }
      }

      // Ensure character starts on walkable terrain
      let startX = Math.floor(width / 2);
      let startY = Math.floor(height / 2);

      // Find a clear spot near the center for character spawn
      for (let attempts = 0; attempts < 50; attempts++) {
        if (state.tiles[startX][startY] < WorldOneTileType.WATER_FLAT_1) {
          break; // Found a good spot
        }
        startX = Math.floor(width / 2) + Math.floor(Math.random() * 6) - 3;
        startY = Math.floor(height / 2) + Math.floor(Math.random() * 6) - 3;
        startX = Math.max(0, Math.min(width - 1, startX));
        startY = Math.max(0, Math.min(height - 1, startY));
      }

      state.character.x = startX;
      state.character.y = startY;
      state.character.isMoving = false;

      state.worldType = WorldType.FLAT_WORLD_ONE;
      state.isLoaded = true;
    },

    generateBasicWorld: (state) => {
      // Import the basic world layout
      const { BasicTileType } = require("../constants/basicWorld");
      const {
        BASIC_WORLD_LAYOUT,
        BASIC_WORLD_CONFIG,
      } = require("../constants/basicWorld");

      state.worldSize = {
        width: BASIC_WORLD_CONFIG.WIDTH,
        height: BASIC_WORLD_CONFIG.HEIGHT,
      };

      // Copy the predefined layout
      state.tiles = [];
      for (let x = 0; x < BASIC_WORLD_CONFIG.WIDTH; x++) {
        state.tiles[x] = [];
        for (let y = 0; y < BASIC_WORLD_CONFIG.HEIGHT; y++) {
          state.tiles[x][y] = BASIC_WORLD_LAYOUT[x][y];
        }
      }

      // Set character spawn position
      state.character.x = BASIC_WORLD_CONFIG.SPAWN_X;
      state.character.y = BASIC_WORLD_CONFIG.SPAWN_Y;
      state.character.isMoving = false;

      state.worldType = WorldType.BASIC_WORLD;
      state.isLoaded = true;
    },
  },
});

export const {
  // generateWorld removed - no more procedural generation
  generateFlatWorldOne,
  generateBasicWorld,
  setTile,
  getTile,
  moveCharacter,
  updateCharacterPosition,
  moveCamera,
  setCameraPosition,
  setZoom,
  resetWorld,
  setWorldType,
} = worldSlice.actions;

export default worldSlice.reducer;
