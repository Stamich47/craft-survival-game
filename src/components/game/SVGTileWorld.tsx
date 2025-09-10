import React, { useMemo, memo } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Polygon, Circle } from "react-native-svg";
import { TileType, Character } from "../../store/worldSlice";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface SVGTileWorldProps {
  tiles: number[][]; // 2D array representing the tile world
  character: Character;
  tileSize: number;
  offsetX?: number;
  offsetY?: number;
}

interface TileProps {
  x: number;
  y: number;
  type: number;
  tileSize: number;
  screenX: number;
  screenY: number;
}

interface CharacterProps {
  character: Character;
  tileSize: number;
  screenX: number;
  screenY: number;
}

// Convert 2D tile coordinates to isometric screen coordinates
const tileToIso = (x: number, y: number, tileSize: number) => {
  const isoX = (x - y) * (tileSize / 2);
  const isoY = (x + y) * (tileSize / 4);
  return { x: isoX, y: isoY };
};

// Memoized individual tile component using SVG
const SVGTile = memo<TileProps>(
  ({ x, y, type, tileSize, screenX, screenY }) => {
    const tileColors = {
      [TileType.GRASS]: "#228B22", // Green
      [TileType.DIRT]: "#8B4513", // Brown
      [TileType.STONE]: "#708090", // Gray
      [TileType.SAND]: "#D2B48C", // Tan
      [TileType.WATER]: "#4169E1", // Blue
      [TileType.TREE]: "#654321", // Dark brown for trunk
      [TileType.MOUNTAIN]: "#696969", // Dark gray
    };

    const color = tileColors[type as keyof typeof tileColors] || "#CCCCCC";

    // Calculate tile diamond shape points
    const halfTile = tileSize / 2;
    const quarterTile = tileSize / 4;

    const tilePoints = `${screenX},${screenY - quarterTile} ${
      screenX + halfTile
    },${screenY} ${screenX},${screenY + quarterTile} ${
      screenX - halfTile
    },${screenY}`;

    return (
      <>
        {/* Base tile */}
        <Polygon
          points={tilePoints}
          fill={color}
          stroke="#000"
          strokeWidth="1"
        />

        {/* Tree rendering - add a circle for tree top */}
        {type === TileType.TREE && (
          <Circle
            cx={screenX}
            cy={screenY - quarterTile - 10}
            r={15}
            fill="#228B22" // Green for leaves
            stroke="#000"
            strokeWidth="1"
          />
        )}
      </>
    );
  }
);

// Memoized character component
const SVGCharacter = memo<CharacterProps>(
  ({ character, tileSize, screenX, screenY }) => {
    return (
      <Circle
        cx={screenX}
        cy={screenY - 8} // Slightly elevated above ground
        r={8}
        fill="#FF6B6B" // Red character
        stroke="#000"
        strokeWidth="2"
      />
    );
  }
);

export const SVGTileWorld = memo<SVGTileWorldProps>(
  ({ tiles, character, tileSize = 40, offsetX = 0, offsetY = 0 }) => {
    // Convert tile data to renderable tiles
    const renderData = useMemo(() => {
      const tileData: Array<TileProps> = [];

      // Calculate character's isometric position
      const characterIsoPos = tileToIso(character.x, character.y, tileSize);

      // Position world so character is centered on screen (adjust for UI)
      const characterScreenX = screenWidth / 2;
      const characterScreenY = screenHeight / 2 - 50; // Move up 50px to account for header/footer

      for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[x].length; y++) {
          const tileType = tiles[x][y];
          const isoPos = tileToIso(x, y, tileSize);

          // Position each tile relative to the character's screen position
          const screenX =
            characterScreenX + (isoPos.x - characterIsoPos.x) + offsetX;
          const screenY =
            characterScreenY + (isoPos.y - characterIsoPos.y) + offsetY;

          tileData.push({
            x,
            y,
            type: tileType,
            tileSize,
            screenX,
            screenY,
          });
        }
      }

      // Sort tiles by depth for proper rendering order (back to front)
      tileData.sort((a, b) => {
        const depthA = a.x + a.y;
        const depthB = b.x + b.y;
        return depthA - depthB;
      });

      return tileData;
    }, [tiles, character, tileSize, offsetX, offsetY]);

    // Calculate character screen position (always centered, adjusted for UI)
    const characterScreenPos = useMemo(() => {
      return {
        x: screenWidth / 2 + offsetX,
        y: screenHeight / 2 - 50 + offsetY, // Move up 50px to account for header/footer
      };
    }, [offsetX, offsetY]);

    return (
      <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
        <Svg
          width={screenWidth}
          height={screenHeight}
          style={{ position: "absolute" }}
        >
          {/* Render all tiles */}
          {renderData.map((tile, index) => (
            <SVGTile key={`${tile.x}-${tile.y}`} {...tile} />
          ))}

          {/* Render character on top */}
          <SVGCharacter
            character={character}
            tileSize={tileSize}
            screenX={characterScreenPos.x}
            screenY={characterScreenPos.y}
          />
        </Svg>
      </View>
    );
  }
);
