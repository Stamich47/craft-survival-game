import React, { useMemo, memo } from "react";
import { Dimensions, View, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Character } from "../../store/worldSlice";
import {
  WorldOneTileType,
  getAssetForTileType,
} from "../../constants/worldOneAssets";
import {
  tileToIso,
  getDecorationInfo,
  getTileDepth,
  isTileVisible,
  requiresSpriteClipping,
  getTileIndex,
  getTilePositionInTilemap,
  TILEMAP_CONFIG,
} from "../../utils/spriteUtils";
import { AnimatedSprite } from "./AnimatedSprite";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface WorldOneTileWorldProps {
  tiles: number[][]; // 2D array representing the tile world
  character: Character;
  tileSize: number;
  offsetX?: number;
  offsetY?: number;
}

interface TileRenderData {
  x: number;
  y: number;
  tileType: WorldOneTileType;
  screenX: number;
  screenY: number;
  depth: number;
  decorationInfo: ReturnType<typeof getDecorationInfo>;
  requiresClipping: boolean;
}

interface CharacterProps {
  character: Character;
  tileSize: number;
  screenX: number;
  screenY: number;
}

// Memoized individual tile component using sprites
const WorldOneTile = memo<TileRenderData>(
  ({ x, y, tileType, screenX, screenY, decorationInfo, requiresClipping }) => {
    const assetSource = getAssetForTileType(tileType);

    if (!assetSource) {
      return null;
    }

    // Check if tile is visible (performance optimization)
    if (!isTileVisible(screenX, screenY, decorationInfo.width)) {
      return null;
    }

    // Calculate final position with decoration offset
    const finalX = screenX - decorationInfo.width / 2;
    const finalY = screenY - decorationInfo.height / 2 + decorationInfo.offsetY;

    // Handle animated sprites (water)
    if (
      tileType >= WorldOneTileType.WATER_FLAT_1 &&
      tileType <= WorldOneTileType.WATER_ELEVATION_4
    ) {
      return (
        <AnimatedSprite
          tileType={tileType}
          x={finalX}
          y={finalY}
          width={decorationInfo.width}
          height={decorationInfo.height}
          style={{ zIndex: Math.floor(getTileDepth(x, y, tileType) * 100) }}
        />
      );
    }

    // Handle tilemap sprites (terrain that needs clipping)
    if (requiresClipping && tileType < WorldOneTileType.WATER_FLAT_1) {
      const tileInfo = getTileIndex(tileType);
      if (tileInfo) {
        const config =
          TILEMAP_CONFIG[
            `${tileInfo.tilemapType}_TILEMAP` as keyof typeof TILEMAP_CONFIG
          ];
        if (config && typeof config === "object") {
          const position = getTilePositionInTilemap(tileInfo.tileIndex, config);

          return (
            <View
              style={{
                position: "absolute",
                left: finalX,
                top: finalY,
                width: decorationInfo.width,
                height: decorationInfo.height,
                overflow: "hidden",
                zIndex: Math.floor(getTileDepth(x, y, tileType) * 100),
              }}
            >
              <Image
                source={assetSource}
                style={{
                  position: "absolute",
                  left: -position.sourceX,
                  top: -position.sourceY,
                  width: config.tilesPerRow * config.tileWidth,
                  height: config.tilesPerColumn * config.tileHeight,
                }}
                resizeMode="stretch"
              />
            </View>
          );
        }
      }
    }

    // Handle individual sprite assets (trees, bushes, rocks)
    return (
      <Image
        source={assetSource}
        style={{
          position: "absolute",
          left: finalX,
          top: finalY,
          width: decorationInfo.width,
          height: decorationInfo.height,
          zIndex: Math.floor(getTileDepth(x, y, tileType) * 100),
        }}
        resizeMode="contain"
      />
    );
  }
);

WorldOneTile.displayName = "WorldOneTile";

// Memoized character component (unchanged from SVGTileWorld)
const SVGCharacter = memo<CharacterProps>(
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

SVGCharacter.displayName = "SVGCharacter";

export const WorldOneTileWorld = memo<WorldOneTileWorldProps>(
  ({ tiles, character, tileSize = 48, offsetX = 0, offsetY = 0 }) => {
    // Convert tile data to renderable sprites
    const renderData = useMemo(() => {
      const tileData: Array<TileRenderData> = [];

      // Calculate character's isometric position
      const characterIsoPos = tileToIso(character.x, character.y, tileSize);

      // Position world so character is centered on screen (adjust for UI)
      const characterScreenX = screenWidth / 2;
      const characterScreenY = screenHeight / 2 - 50; // Move up 50px to account for header/footer

      for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[x].length; y++) {
          const tileType = tiles[x][y] as WorldOneTileType;
          const isoPos = tileToIso(x, y, tileSize);

          // Position each tile relative to the character's screen position
          const screenX =
            characterScreenX + (isoPos.x - characterIsoPos.x) + offsetX;
          const screenY =
            characterScreenY + (isoPos.y - characterIsoPos.y) + offsetY;

          const decorationInfo = getDecorationInfo(tileType);
          const depth = getTileDepth(x, y, tileType);

          tileData.push({
            x,
            y,
            tileType,
            screenX,
            screenY,
            depth,
            decorationInfo,
            requiresClipping: requiresSpriteClipping(tileType),
          });
        }
      }

      // Sort tiles by depth for proper rendering order (back to front)
      tileData.sort((a, b) => a.depth - b.depth);

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
        {/* Render all tiles as sprites */}
        {renderData.map((tile, index) => (
          <WorldOneTile key={`${tile.x}-${tile.y}`} {...tile} />
        ))}

        {/* Render character on top */}
        <SVGCharacter
          character={character}
          tileSize={tileSize}
          screenX={characterScreenPos.x}
          screenY={characterScreenPos.y}
        />
      </View>
    );
  }
);

WorldOneTileWorld.displayName = "WorldOneTileWorld";
