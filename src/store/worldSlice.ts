import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Voxel types
export enum VoxelType {
  AIR = 0,
  DIRT = 1,
  GRASS = 2,
  STONE = 3,
  SAND = 4,
  WATER = 5,
  WOOD = 6,
  LEAVES = 7,
}

export interface WorldState {
  world: number[][][]; // 3D voxel array
  worldSize: {
    width: number;
    height: number;
    depth: number;
  };
  camera: {
    offsetX: number;
    offsetY: number;
    zoom: number;
  };
  isLoaded: boolean;
}

const initialState: WorldState = {
  world: [],
  worldSize: {
    width: 16,
    height: 16,
    depth: 8,
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
      action: PayloadAction<{ width?: number; height?: number; depth?: number }>
    ) => {
      const { width = 16, height = 16, depth = 8 } = action.payload;

      state.worldSize = { width, height, depth };
      state.world = [];

      // Generate the world
      for (let x = 0; x < width; x++) {
        state.world[x] = [];
        for (let y = 0; y < height; y++) {
          state.world[x][y] = [];
          for (let z = 0; z < depth; z++) {
            if (z === 0) {
              // Bedrock layer
              state.world[x][y][z] = VoxelType.STONE;
            } else if (z === 1 || z === 2) {
              // Dirt layers
              state.world[x][y][z] = VoxelType.DIRT;
            } else if (z === 3) {
              // Surface layer - grass
              state.world[x][y][z] = VoxelType.GRASS;
            } else if (z === 4 && Math.random() > 0.8) {
              // Occasional trees (wood)
              state.world[x][y][z] = VoxelType.WOOD;
            } else if (
              z === 5 &&
              state.world[x][y][z - 1] === VoxelType.WOOD &&
              Math.random() > 0.5
            ) {
              // Tree leaves above wood
              state.world[x][y][z] = VoxelType.LEAVES;
            } else {
              // Air
              state.world[x][y][z] = VoxelType.AIR;
            }
          }
        }
      }

      state.isLoaded = true;
    },

    setVoxel: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        z: number;
        type: VoxelType;
      }>
    ) => {
      const { x, y, z, type } = action.payload;
      if (
        x >= 0 &&
        x < state.worldSize.width &&
        y >= 0 &&
        y < state.worldSize.height &&
        z >= 0 &&
        z < state.worldSize.depth
      ) {
        state.world[x][y][z] = type;
      }
    },

    getVoxel: (
      state,
      action: PayloadAction<{ x: number; y: number; z: number }>
    ) => {
      // This reducer doesn't modify state, it's just for consistency
      // Use a selector instead for getting voxel data
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

    // Mining action - remove a voxel and potentially add to inventory
    mineVoxel: (
      state,
      action: PayloadAction<{ x: number; y: number; z: number }>
    ) => {
      const { x, y, z } = action.payload;
      if (
        x >= 0 &&
        x < state.worldSize.width &&
        y >= 0 &&
        y < state.worldSize.height &&
        z >= 0 &&
        z < state.worldSize.depth
      ) {
        const voxelType = state.world[x][y][z];
        if (voxelType !== VoxelType.AIR) {
          state.world[x][y][z] = VoxelType.AIR;
          // TODO: Add the mined material to inventory based on voxelType
        }
      }
    },

    // Place a voxel from inventory
    placeVoxel: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        z: number;
        type: VoxelType;
      }>
    ) => {
      const { x, y, z, type } = action.payload;
      if (
        x >= 0 &&
        x < state.worldSize.width &&
        y >= 0 &&
        y < state.worldSize.height &&
        z >= 0 &&
        z < state.worldSize.depth &&
        state.world[x][y][z] === VoxelType.AIR
      ) {
        state.world[x][y][z] = type;
        // TODO: Remove the placed material from inventory
      }
    },
  },
});

export const {
  generateWorld,
  setVoxel,
  getVoxel,
  moveCamera,
  setCameraPosition,
  setZoom,
  mineVoxel,
  placeVoxel,
} = worldSlice.actions;

export default worldSlice.reducer;
