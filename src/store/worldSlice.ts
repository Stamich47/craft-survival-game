import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  isLoaded: false,
};

const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    generateWorld: (
      state,
      action: PayloadAction<{ width?: number; height?: number }>
    ) => {
      const { width = 20, height = 20 } = action.payload;

      state.worldSize = { width, height };
      state.tiles = [];

      // Generate 2D tile-based terrain
      for (let x = 0; x < width; x++) {
        state.tiles[x] = [];
        for (let y = 0; y < height; y++) {
          // Create height map using noise-like function for terrain variation
          const heightNoise1 = Math.sin(x * 0.2) * Math.cos(y * 0.2);
          const heightNoise2 = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 2;
          const terrainValue = heightNoise1 + heightNoise2;

          // Determine tile type based on terrain value and position
          if (terrainValue < -1.5) {
            state.tiles[x][y] = TileType.WATER;
          } else if (terrainValue < -0.5) {
            state.tiles[x][y] = TileType.SAND;
          } else if (terrainValue > 1.5) {
            state.tiles[x][y] = TileType.MOUNTAIN;
          } else if (terrainValue > 0.8) {
            state.tiles[x][y] = TileType.STONE;
          } else if (Math.random() > 0.85) {
            // Randomly place trees on grass areas
            state.tiles[x][y] = TileType.TREE;
          } else if (Math.random() > 0.9) {
            // Some dirt patches
            state.tiles[x][y] = TileType.DIRT;
          } else {
            // Default to grass
            state.tiles[x][y] = TileType.GRASS;
          }
        }
      }

      // Place character in a good starting position
      state.character.x = Math.floor(width / 2);
      state.character.y = Math.floor(height / 2);
      state.character.isMoving = false;

      state.isLoaded = true;
    },

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
        y < state.worldSize.height &&
        state.tiles[x][y] !== TileType.WATER &&
        state.tiles[x][y] !== TileType.MOUNTAIN
      ) {
        console.log("✅ Moved to:", x, y);
        // Move character immediately to the new position
        state.character.x = x;
        state.character.y = y;
        state.character.targetX = x;
        state.character.targetY = y;
        state.character.isMoving = false; // Not moving since we teleport instantly
      } else {
        console.log("❌ Blocked:", x, y, "(out of bounds or unwalkable)");
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
  },
});

export const {
  generateWorld,
  setTile,
  getTile,
  moveCharacter,
  updateCharacterPosition,
  moveCamera,
  setCameraPosition,
  setZoom,
  resetWorld,
} = worldSlice.actions;

export default worldSlice.reducer;
