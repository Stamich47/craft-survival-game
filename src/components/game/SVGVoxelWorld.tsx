import React, { useMemo } from "react";
import { Dimensions, PanResponder, View } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface SVGVoxelWorldProps {
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

// Individual voxel/cube component using SVG
const SVGVoxelCube: React.FC<VoxelProps> = ({
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
    6: "#8B4513", // Brown (wood)
    7: "#228B22", // Green (leaves)
  };

  if (type === 0) return null; // Don't render air blocks

  const color = cubeColors[type as keyof typeof cubeColors] || "#CCCCCC";

  // Calculate cube face points
  const halfTile = tileSize / 2;
  const quarterTile = tileSize / 4;

  // Top face (diamond shape)
  const topPoints = `${screenX},${screenY} ${screenX + halfTile},${
    screenY - quarterTile
  } ${screenX},${screenY - halfTile} ${screenX - halfTile},${
    screenY - quarterTile
  }`;

  // Left face
  const leftPoints = `${screenX - halfTile},${
    screenY - quarterTile
  } ${screenX},${screenY - halfTile} ${screenX},${screenY} ${
    screenX - halfTile
  },${screenY + quarterTile}`;

  // Right face
  const rightPoints = `${screenX + halfTile},${
    screenY - quarterTile
  } ${screenX},${screenY - halfTile} ${screenX},${screenY} ${
    screenX + halfTile
  },${screenY + quarterTile}`;

  // Adjust brightness for 3D effect
  const topColor = color;
  const leftColor = adjustBrightness(color, -30);
  const rightColor = adjustBrightness(color, -50);

  return (
    <>
      {/* Right face (darkest, drawn first) */}
      <Polygon
        points={rightPoints}
        fill={rightColor}
        stroke="#000"
        strokeWidth="0.5"
      />
      {/* Left face (medium shade) */}
      <Polygon
        points={leftPoints}
        fill={leftColor}
        stroke="#000"
        strokeWidth="0.5"
      />
      {/* Top face (brightest, drawn last) */}
      <Polygon
        points={topPoints}
        fill={topColor}
        stroke="#000"
        strokeWidth="0.5"
      />
    </>
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

export const SVGVoxelWorld: React.FC<SVGVoxelWorldProps> = ({
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
      const depthA = a.x + a.y - a.z;
      const depthB = b.x + b.y - b.z;
      return depthA - depthB;
    });
  }, [world, tileSize, offsetX, offsetY]);

  return (
    <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      <Svg
        width={screenWidth}
        height={screenHeight}
        style={{ position: "absolute" }}
      >
        {voxels.map((voxel, index) => (
          <SVGVoxelCube key={`${voxel.x}-${voxel.y}-${voxel.z}`} {...voxel} />
        ))}
      </Svg>
    </View>
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
