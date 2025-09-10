import React, { useMemo, memo } from "react";
import { Dimensions, View, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Character } from "../../store/worldSlice";
import { BasicTileType, getBasicTileAsset } from "../../constants/basicWorld";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface BasicTileWorldProps {
  tiles: number[][]; // 2D array of BasicTileType values
  character: Character;
  tileSize: number;
  offsetX?: number;
  offsetY?: number;
}

interface TileRenderData {
  x: number;
  y: number;
  tileType: BasicTileType;
  screenX: number;
  screenY: number;
  depth: number;
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

// Memoized individual tile component
const BasicTile = memo<TileRenderData>(
  ({ x, y, tileType, screenX, screenY, depth }) => {
    const assetSource = getBasicTileAsset(tileType);

    if (!assetSource) {
      return null;
    }

    // Calculate final position (center the tile)
    const finalX = screenX - 32; // Half of 64px tile
    const finalY = screenY - 16; // Adjust for isometric view

    return (
      <Image
        source={assetSource}
        style={{
          position: "absolute",
          left: finalX,
          top: finalY,
          width: 64,
          height: 64,
          zIndex: Math.floor(depth * 100),
        }}
        resizeMode="contain"
      />
    );
  }
);

BasicTile.displayName = "BasicTile";

// Memoized character component
const BasicCharacter = memo<CharacterProps>(
  ({ character, tileSize, screenX, screenY }) => {
    return (
      <Svg
        width={20}
        height={20}
        style={{
          position: "absolute",
          left: screenX - 10,
          top: screenY - 18,
          zIndex: 10000, // Always on top
        }}
      >
        <Circle
          cx={10}
          cy={10}
          r={8}
          fill="#FF6B6B" // Red character
          stroke="#000"
          strokeWidth="2"
        />
      </Svg>
    );
  }
);

BasicCharacter.displayName = "BasicCharacter";

export const BasicTileWorld = memo<BasicTileWorldProps>(
  ({ tiles, character, tileSize = 64, offsetX = 0, offsetY = 0 }) => {
    // Convert tile data to renderable sprites
    const renderData = useMemo(() => {
      const tileData: Array<TileRenderData> = [];

      // Calculate character's isometric position
      const characterIsoPos = tileToIso(character.x, character.y, tileSize);

      // Position world so character is centered on screen
      const characterScreenX = screenWidth / 2;
      const characterScreenY = screenHeight / 2 - 50;

      for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[x].length; y++) {
          const tileType = tiles[x][y] as BasicTileType;
          const isoPos = tileToIso(x, y, tileSize);

          // Position each tile relative to the character's screen position
          const screenX =
            characterScreenX + (isoPos.x - characterIsoPos.x) + offsetX;
          const screenY =
            characterScreenY + (isoPos.y - characterIsoPos.y) + offsetY;

          const depth = x + y; // Simple depth sorting

          tileData.push({
            x,
            y,
            tileType,
            screenX,
            screenY,
            depth,
          });
        }
      }

      // Sort tiles by depth for proper rendering order (back to front)
      tileData.sort((a, b) => a.depth - b.depth);

      return tileData;
    }, [tiles, character, tileSize, offsetX, offsetY]);

    // Calculate character screen position
    const characterScreenPos = useMemo(() => {
      return {
        x: screenWidth / 2 + offsetX,
        y: screenHeight / 2 - 50 + offsetY,
      };
    }, [offsetX, offsetY]);

    return (
      <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
        {/* Render all tiles */}
        {renderData.map((tile, index) => (
          <BasicTile key={`${tile.x}-${tile.y}`} {...tile} />
        ))}

        {/* Render character on top */}
        <BasicCharacter
          character={character}
          tileSize={tileSize}
          screenX={characterScreenPos.x}
          screenY={characterScreenPos.y}
        />
      </View>
    );
  }
);

BasicTileWorld.displayName = "BasicTileWorld";
