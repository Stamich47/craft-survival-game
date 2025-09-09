import React, { useMemo } from "react";
import { Dimensions } from "react-native";
import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface VoxelWorldProps {
  world: number[][][]; // 3D array representing the voxel world
  tileSize: number;
  offsetX?: number;
  offsetY?: number;
}

interface VoxelProps {
  x: number;
  y: number;
  z: number;
  type: number;
  tileSize: number;
  screenX: number;
  screenY: number;
}

// Convert 3D world coordinates to isometric screen coordinates
const worldToIso = (x: number, y: number, z: number, tileSize: number) => {
  const isoX = (x - y) * (tileSize / 2);
  const isoY = (x + y) * (tileSize / 4) - z * (tileSize / 2);
  return { x: isoX, y: isoY };
};

// Individual voxel/cube component
const VoxelCube: React.FC<VoxelProps> = ({
  x,
  y,
  z,
  type,
  tileSize,
  screenX,
  screenY,
}) => {
  const cubeColors = {
    0: "#00000000", // Transparent/air
    1: "#8B4513", // Brown (dirt)
    2: "#228B22", // Green (grass)
    3: "#708090", // Gray (stone)
    4: "#D2B48C", // Tan (sand)
    5: "#4169E1", // Blue (water)
  };

  if (type === 0) return null; // Don't render air blocks

  const color = cubeColors[type as keyof typeof cubeColors] || "#CCCCCC";

  // Create the isometric cube paths
  const topPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.moveTo(screenX, screenY);
    path.lineTo(screenX + tileSize / 2, screenY - tileSize / 4);
    path.lineTo(screenX, screenY - tileSize / 2);
    path.lineTo(screenX - tileSize / 2, screenY - tileSize / 4);
    path.close();
    return path;
  }, [screenX, screenY, tileSize]);

  const leftPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.moveTo(screenX - tileSize / 2, screenY - tileSize / 4);
    path.lineTo(screenX, screenY - tileSize / 2);
    path.lineTo(screenX, screenY);
    path.lineTo(screenX - tileSize / 2, screenY + tileSize / 4);
    path.close();
    return path;
  }, [screenX, screenY, tileSize]);

  const rightPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.moveTo(screenX + tileSize / 2, screenY - tileSize / 4);
    path.lineTo(screenX, screenY - tileSize / 2);
    path.lineTo(screenX, screenY);
    path.lineTo(screenX + tileSize / 2, screenY + tileSize / 4);
    path.close();
    return path;
  }, [screenX, screenY, tileSize]);

  // Lighter shade for top, darker for sides
  const topColor = color;
  const leftColor = adjustBrightness(color, -20);
  const rightColor = adjustBrightness(color, -40);

  return (
    <Group>
      {/* Top face */}
      <Path path={topPath} color={topColor} />
      {/* Left face */}
      <Path path={leftPath} color={leftColor} />
      {/* Right face */}
      <Path path={rightPath} color={rightColor} />
    </Group>
  );
};

// Utility function to adjust color brightness
const adjustBrightness = (color: string, amount: number): string => {
  const hex = color.replace("#", "");
  const r = Math.max(
    0,
    Math.min(255, parseInt(hex.substring(0, 2), 16) + amount)
  );
  const g = Math.max(
    0,
    Math.min(255, parseInt(hex.substring(2, 4), 16) + amount)
  );
  const b = Math.max(
    0,
    Math.min(255, parseInt(hex.substring(4, 6), 16) + amount)
  );

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const VoxelWorld: React.FC<VoxelWorldProps> = ({
  world,
  tileSize = 32,
  offsetX = 0,
  offsetY = 0,
}) => {
  // Convert world data to renderable voxels
  const voxels = useMemo(() => {
    const result: Array<VoxelProps> = [];

    for (let x = 0; x < world.length; x++) {
      for (let y = 0; y < world[x].length; y++) {
        for (let z = 0; z < world[x][y].length; z++) {
          const voxelType = world[x][y][z];
          if (voxelType !== 0) {
            // Only render non-air blocks
            const isoPos = worldToIso(x, y, z, tileSize);
            result.push({
              x,
              y,
              z,
              type: voxelType,
              tileSize,
              screenX: isoPos.x + screenWidth / 2 + offsetX,
              screenY: isoPos.y + screenHeight / 2 + offsetY,
            });
          }
        }
      }
    }

    // Sort by depth for proper rendering order (back to front)
    return result.sort((a, b) => {
      const depthA = a.x + a.y + a.z;
      const depthB = b.x + b.y + b.z;
      return depthA - depthB;
    });
  }, [world, tileSize, offsetX, offsetY]);

  return (
    <Canvas style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      <Group>
        {voxels.map((voxel, index) => (
          <VoxelCube key={`${voxel.x}-${voxel.y}-${voxel.z}`} {...voxel} />
        ))}
      </Group>
    </Canvas>
  );
};

// Sample world generator
export const generateSampleWorld = (
  width: number = 8,
  height: number = 8,
  depth: number = 4
): number[][][] => {
  const world: number[][][] = [];

  for (let x = 0; x < width; x++) {
    world[x] = [];
    for (let y = 0; y < height; y++) {
      world[x][y] = [];
      for (let z = 0; z < depth; z++) {
        if (z === 0) {
          // Ground layer - mix of dirt and stone
          world[x][y][z] = Math.random() > 0.7 ? 3 : 1; // Stone or dirt
        } else if (z === 1) {
          // Surface layer - grass and some stone
          world[x][y][z] =
            Math.random() > 0.8 ? 3 : Math.random() > 0.3 ? 2 : 0; // Grass, stone, or air
        } else {
          // Upper layers - mostly air with occasional blocks
          world[x][y][z] = Math.random() > 0.9 ? 2 : 0; // Mostly air
        }
      }
    }
  }

  return world;
};
