import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveCharacter } from "../../store/worldSlice";
import {
  CUSTOM_WORLD_LAYOUT,
  CUSTOM_WORLD_OVERLAY,
  CUSTOM_WORLD_CONFIG,
  getWorldTileAsset,
  isCliffTile,
  isAnimatedTile,
  getTileAtPosition,
  getOverlayAtPosition,
  hasOverlayAtPosition,
  WorldTileType,
  WORLD_TILES,
} from "../../data/customWorld";
import SimpleAnimatedSprite from "./SimpleAnimatedSprite";

const TILE_SIZE = 64;
const SCALE = 0.8;
const TILE_OVERLAP = 0.5; // Slight overlap to prevent seams

// Animation configs for different sprite sheets
const ANIMATION_CONFIGS: Record<
  WorldTileType,
  | {
      frameCount: number;
      frameDuration: number;
      tileSize?: number;
      width?: number;
      height?: number;
    }
  | undefined
> = {
  [WorldTileType.GRASS_TOP_LEFT_CORNER]: undefined,
  [WorldTileType.GRASS_TOP_MIDDLE]: undefined,
  [WorldTileType.GRASS_TOP_RIGHT_CORNER]: undefined,
  [WorldTileType.GRASS_LEFT_MIDDLE]: undefined,
  [WorldTileType.GRASS]: undefined,
  [WorldTileType.GRASS_BOTTOM_RIGHT_CORNER]: undefined,
  [WorldTileType.GRASS_RIGHT_MIDDLE]: undefined,
  [WorldTileType.CLIFF_BOTTOM_RIGHT]: undefined,
  [WorldTileType.GRASS_BOTTOM_LEFT_CORNER]: undefined,
  [WorldTileType.GRASS_BOTTOM_MIDDLE]: undefined,
  [WorldTileType.CLIFF_BOTTOM_LEFT]: undefined,
  [WorldTileType.CLIFF_BOTTOM_MIDDLE]: undefined,
  [WorldTileType.WATER_CLIFF_LEFT]: {
    frameCount: 12,
    frameDuration: 100,
    tileSize: 64,
  },
  [WorldTileType.WATER_CLIFF_MIDDLE]: {
    frameCount: 12,
    frameDuration: 100,
    tileSize: 64,
  },
  [WorldTileType.WATER_CLIFF_RIGHTT]: {
    frameCount: 12,
    frameDuration: 100,
    tileSize: 64,
  },
  [WorldTileType.TREE1_SPRITE]: {
    frameCount: 8,
    frameDuration: 200,
    width: 192,
    height: 256,
  },
  [WorldTileType.TREE3_SPRITE]: {
    frameCount: 8,
    frameDuration: 200,
    width: 192,
    height: 192,
  },
  // Add more animated sprites here:
};

// Y-axis offsets to fine-tune tree positioning (negative = move up)
const OVERLAY_Y_OFFSETS: Partial<Record<WorldTileType, number>> = {
  [WorldTileType.TREE1_SPRITE]: -15, // Move up 15px
  [WorldTileType.TREE3_SPRITE]: -20, // Move up 20px
  // Add more Y adjustments as needed
};

// Transparency offset - how many pixels from bottom edge to visual tree base
const TREE_TRANSPARENCY_OFFSET: Partial<Record<WorldTileType, number>> = {
  [WorldTileType.TREE1_SPRITE]: 16, // Tree base is 2 blocks (16 pixels) up from sprite bottom
  [WorldTileType.TREE3_SPRITE]: 24, // Tree base is 3 blocks (24 pixels) up from sprite bottom
};

// Tree split ratios - what percentage of tree height is the base vs canopy
const TREE_SPLIT_RATIOS: Partial<
  Record<WorldTileType, { baseRatio: number; canopyRatio: number }>
> = {
  [WorldTileType.TREE1_SPRITE]: { baseRatio: 0.4, canopyRatio: 0.6 }, // 40% base, 60% canopy
  [WorldTileType.TREE3_SPRITE]: { baseRatio: 0.5, canopyRatio: 0.5 }, // 50% base, 50% canopy
};

// Scale factors for overlay sprites (1.0 = same size as base tile)
const OVERLAY_SCALES: Partial<Record<WorldTileType, number>> = {
  [WorldTileType.TREE1_SPRITE]: 0.4, // Scale down the 192x256 tree to reasonable game size
  [WorldTileType.TREE3_SPRITE]: 0.5, // Scale down the 192x192 tree to reasonable game size
  // Add more overlay scales here:
  // [WorldTileType.LARGE_ROCK]: 1.2,
  // [WorldTileType.MAGIC_CRYSTAL]: 2.0,
};

interface CustomTileWorldProps {
  onTilePress?: (x: number, y: number) => void;
}

export const CustomTileWorld: React.FC<CustomTileWorldProps> = ({
  onTilePress,
}) => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.world.character);
  const player = useSelector((state: RootState) => state.player.player);

  // Use character position from world state, fallback to player position or spawn point
  const characterPosition = character || {
    x: player?.position?.x || CUSTOM_WORLD_CONFIG.SPAWN_X,
    y: player?.position?.y || CUSTOM_WORLD_CONFIG.SPAWN_Y,
    isMoving: false,
  };

  const handleTilePress = (x: number, y: number) => {
    // Bounds checking
    if (
      x < 0 ||
      x >= CUSTOM_WORLD_CONFIG.WIDTH ||
      y < 0 ||
      y >= CUSTOM_WORLD_CONFIG.HEIGHT
    ) {
      console.log(`❌ Blocked: ${x} ${y} (out of bounds)`);
      return;
    }

    const tileType = getTileAtPosition(x, y);
    const overlayType = CUSTOM_WORLD_OVERLAY[y] && CUSTOM_WORLD_OVERLAY[y][x];

    // Check what type of overlay is blocking movement
    const isTreeBase =
      overlayType === WorldTileType.TREE1_SPRITE ||
      overlayType === WorldTileType.TREE3_SPRITE;
    const isOtherOverlay = overlayType && !isTreeBase; // Non-tree overlays (like water)

    console.log(
      `Tap -> Tile: ${x} ${y} | Current pos: ${characterPosition.x} ${characterPosition.y}`
    );
    console.log(
      `  TileType: ${tileType}, OverlayType: ${overlayType}, IsTreeBase: ${isTreeBase}, IsOtherOverlay: ${isOtherOverlay}`
    );

    // Can't move to cliff tiles, tree bases, or other solid overlays
    if (tileType && !isCliffTile(tileType) && !isTreeBase && !isOtherOverlay) {
      console.log(`✅ Moving to: ${x} ${y}`);
      dispatch(moveCharacter({ x, y }));
    } else {
      console.log(
        `❌ Blocked: ${x} ${y} (cliff: ${
          tileType ? isCliffTile(tileType) : false
        }, tree: ${isTreeBase}, other: ${isOtherOverlay})`
      );
    }
    onTilePress?.(x, y);
  };

  const renderTile = (x: number, y: number) => {
    const tileType = CUSTOM_WORLD_LAYOUT[y][x];
    const asset = getWorldTileAsset(tileType);

    if (!asset) return null;

    // Calculate simple top-down grid position with slight overlap to prevent seams
    const gridX = x * (TILE_SIZE * SCALE - TILE_OVERLAP);
    const gridY = y * (TILE_SIZE * SCALE - TILE_OVERLAP);

    // Center the world
    const centerOffsetX =
      (400 - CUSTOM_WORLD_CONFIG.WIDTH * TILE_SIZE * SCALE) / 2;
    const centerOffsetY =
      (400 - CUSTOM_WORLD_CONFIG.HEIGHT * TILE_SIZE * SCALE) / 2;

    // Check if this tile should be animated
    const animated = isAnimatedTile(tileType);
    const animationConfig = ANIMATION_CONFIGS[tileType];

    return (
      <View
        key={`tile-${x}-${y}`}
        style={[
          styles.tile,
          {
            left: gridX + centerOffsetX,
            top: gridY + centerOffsetY,
            zIndex: 1,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleTilePress(x, y)}
          style={styles.tileButton}
        >
          {animated && animationConfig ? (
            <SimpleAnimatedSprite
              spriteSheet={asset}
              frameCount={animationConfig.frameCount}
              frameDuration={animationConfig.frameDuration}
              tileSize={animationConfig.tileSize || TILE_SIZE}
              width={TILE_SIZE * SCALE}
              height={TILE_SIZE * SCALE}
              playing={true}
            />
          ) : (
            <Image
              source={asset}
              style={styles.tileImage}
              resizeMode="stretch"
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderOverlay = (x: number, y: number) => {
    const overlayType = CUSTOM_WORLD_OVERLAY[y][x];
    if (!overlayType) return null;

    const asset = getWorldTileAsset(overlayType);
    if (!asset) return null;

    // Skip trees since they're handled by separate tree base/canopy functions
    const isTree =
      overlayType === WorldTileType.TREE1_SPRITE ||
      overlayType === WorldTileType.TREE3_SPRITE;
    if (isTree) return null;

    // Get scale factor for this overlay type
    const overlayScale = OVERLAY_SCALES[overlayType] || 1.0;
    const animationConfig = ANIMATION_CONFIGS[overlayType];

    // Use the animation config width/height if available, otherwise fall back to tileSize or TILE_SIZE
    const baseSpriteWidth =
      animationConfig?.width || animationConfig?.tileSize || TILE_SIZE;
    const baseSpriteHeight =
      animationConfig?.height || animationConfig?.tileSize || TILE_SIZE;
    const scaledWidth = baseSpriteWidth * SCALE * overlayScale;
    const scaledHeight = baseSpriteHeight * SCALE * overlayScale;

    // Calculate base tile position (match the exact positioning from renderTile)
    const baseTileX = x * (TILE_SIZE * SCALE - TILE_OVERLAP);
    const baseTileY = y * (TILE_SIZE * SCALE - TILE_OVERLAP);

    // Center the world (same as base tiles)
    const worldCenterOffsetX =
      (400 - CUSTOM_WORLD_CONFIG.WIDTH * TILE_SIZE * SCALE) / 2;
    const worldCenterOffsetY =
      (400 - CUSTOM_WORLD_CONFIG.HEIGHT * TILE_SIZE * SCALE) / 2;

    // Calculate how to position the overlay so the tree base is centered on the grass tile
    const baseTileSize = TILE_SIZE * SCALE;
    const overlayCenterOffsetX = (scaledWidth - baseTileSize) / 2; // Center horizontally

    // For vertical positioning: we want tree base (not sprite bottom) at grass center
    // Account for transparent pixels at bottom of tree sprites
    const transparencyOffset = TREE_TRANSPARENCY_OFFSET[overlayType] || 0;
    const scaledTransparencyOffset = transparencyOffset * SCALE * overlayScale;

    // Grass center Y = baseTileY + baseTileSize/2
    // Visual tree base Y = tree top Y + scaledHeight - scaledTransparencyOffset
    // So: tree top Y = (grass center Y) - scaledHeight + scaledTransparencyOffset
    const grassCenterY = baseTileSize / 2;
    const treeTopOffset =
      grassCenterY - scaledHeight + scaledTransparencyOffset;

    const animated = isAnimatedTile(overlayType);

    return (
      <View
        key={`overlay-${x}-${y}`}
        style={[
          styles.overlay,
          {
            position: "absolute",
            left: baseTileX + worldCenterOffsetX - overlayCenterOffsetX,
            top: baseTileY + worldCenterOffsetY + treeTopOffset, // Position so tree bottom aligns with grass center
            width: scaledWidth,
            height: scaledHeight,
            zIndex: 10, // Higher z-index than base tiles
          },
        ]}
      >
        {animated && animationConfig ? (
          <SimpleAnimatedSprite
            spriteSheet={asset}
            frameCount={animationConfig.frameCount}
            frameDuration={animationConfig.frameDuration}
            tileSize={
              animationConfig.width || animationConfig.tileSize || TILE_SIZE
            }
            width={scaledWidth}
            height={scaledHeight}
            playing={true}
          />
        ) : (
          <Image
            source={asset}
            style={styles.overlayImage}
            resizeMode="stretch"
          />
        )}
      </View>
    );
  };

  const renderTreeBase = (x: number, y: number) => {
    const overlayType = CUSTOM_WORLD_OVERLAY[y][x];
    if (!overlayType) return null;

    const asset = getWorldTileAsset(overlayType);
    if (!asset) return null;

    // Only render trees for base layer
    const isTree =
      overlayType === WorldTileType.TREE1_SPRITE ||
      overlayType === WorldTileType.TREE3_SPRITE;
    if (!isTree) return null;

    // Get split ratio for this tree type
    const splitRatio = TREE_SPLIT_RATIOS[overlayType];
    if (!splitRatio) return null;

    // Get scale factor for this overlay type
    const overlayScale = OVERLAY_SCALES[overlayType] || 1.0;
    const animationConfig = ANIMATION_CONFIGS[overlayType];

    // Use the animation config width/height if available, otherwise fall back to tileSize or TILE_SIZE
    const baseSpriteWidth =
      animationConfig?.width || animationConfig?.tileSize || TILE_SIZE;
    const baseSpriteHeight =
      animationConfig?.height || animationConfig?.tileSize || TILE_SIZE;
    const scaledWidth = baseSpriteWidth * SCALE * overlayScale;
    const scaledHeight = baseSpriteHeight * SCALE * overlayScale;

    // Calculate base tile position (match the exact positioning from renderTile)
    const baseTileX = x * (TILE_SIZE * SCALE - TILE_OVERLAP);
    const baseTileY = y * (TILE_SIZE * SCALE - TILE_OVERLAP);

    // Center the world (same as base tiles)
    const worldCenterOffsetX =
      (400 - CUSTOM_WORLD_CONFIG.WIDTH * TILE_SIZE * SCALE) / 2;
    const worldCenterOffsetY =
      (400 - CUSTOM_WORLD_CONFIG.HEIGHT * TILE_SIZE * SCALE) / 2;

    // Calculate how to position the overlay so the tree base is centered on the grass tile
    const baseTileSize = TILE_SIZE * SCALE;
    const overlayCenterOffsetX = (scaledWidth - baseTileSize) / 2; // Center horizontally

    // For vertical positioning: we want tree base (not sprite bottom) at grass center
    // Account for transparent pixels at bottom of tree sprites
    const transparencyOffset = TREE_TRANSPARENCY_OFFSET[overlayType] || 0;
    const scaledTransparencyOffset = transparencyOffset * SCALE * overlayScale;

    // Grass center Y = baseTileY + baseTileSize/2
    // Visual tree base Y = tree top Y + scaledHeight - scaledTransparencyOffset
    // So: tree top Y = (grass center Y) - scaledHeight + scaledTransparencyOffset
    const grassCenterY = baseTileSize / 2;
    const treeTopOffset =
      grassCenterY - scaledHeight + scaledTransparencyOffset;

    const animated = isAnimatedTile(overlayType);

    // Calculate base height (bottom portion of tree)
    const baseHeight = scaledHeight * splitRatio.baseRatio;

    return (
      <View
        key={`tree-base-${x}-${y}`}
        style={[
          styles.overlay,
          {
            position: "absolute",
            left: baseTileX + worldCenterOffsetX - overlayCenterOffsetX,
            top:
              baseTileY +
              worldCenterOffsetY +
              treeTopOffset +
              (scaledHeight - baseHeight), // Position at bottom of tree
            width: scaledWidth,
            height: baseHeight,
            overflow: "hidden",
            zIndex: y + 50, // Y-based z-index for proper layering
            pointerEvents: "none", // Don't intercept touch events
          },
        ]}
      >
        <View style={{ marginTop: -(scaledHeight - baseHeight) }}>
          {animated && animationConfig ? (
            <SimpleAnimatedSprite
              spriteSheet={asset}
              frameCount={animationConfig.frameCount}
              frameDuration={animationConfig.frameDuration}
              tileSize={
                animationConfig.width || animationConfig.tileSize || TILE_SIZE
              }
              width={scaledWidth}
              height={scaledHeight}
              playing={true}
            />
          ) : (
            <Image
              source={asset}
              style={[
                styles.overlayImage,
                { width: scaledWidth, height: scaledHeight },
              ]}
              resizeMode="stretch"
            />
          )}
        </View>
      </View>
    );
  };

  const renderPlayer = () => {
    const x = characterPosition.x;
    const y = characterPosition.y;

    // Calculate simple top-down grid position (not isometric)
    const gridX = x * (TILE_SIZE * SCALE);
    const gridY = y * (TILE_SIZE * SCALE);

    // Center the world (same as tiles)
    const centerOffsetX =
      (400 - CUSTOM_WORLD_CONFIG.WIDTH * TILE_SIZE * SCALE) / 2;
    const centerOffsetY =
      (400 - CUSTOM_WORLD_CONFIG.HEIGHT * TILE_SIZE * SCALE) / 2;

    return (
      <View
        style={[
          styles.player,
          {
            left: gridX + centerOffsetX + (TILE_SIZE * SCALE) / 2 - 10, // Center on tile
            top: gridY + centerOffsetY + (TILE_SIZE * SCALE) / 2 - 10, // Center on tile
            zIndex: y + 60, // Y-based z-index (above tree bases, below tree canopies)
          },
        ]}
      >
        <View style={styles.playerDot} />
      </View>
    );
  };

  const renderTreeCanopy = (x: number, y: number) => {
    const overlayType = CUSTOM_WORLD_OVERLAY[y][x];
    if (!overlayType) return null;

    const asset = getWorldTileAsset(overlayType);
    if (!asset) return null;

    // Only render trees for canopy layer
    const isTree =
      overlayType === WorldTileType.TREE1_SPRITE ||
      overlayType === WorldTileType.TREE3_SPRITE;
    if (!isTree) return null;

    // Get split ratio for this tree type
    const splitRatio = TREE_SPLIT_RATIOS[overlayType];
    if (!splitRatio) return null;

    // Get scale factor for this overlay type
    const overlayScale = OVERLAY_SCALES[overlayType] || 1.0;
    const animationConfig = ANIMATION_CONFIGS[overlayType];

    // Use the animation config width/height if available, otherwise fall back to tileSize or TILE_SIZE
    const baseSpriteWidth =
      animationConfig?.width || animationConfig?.tileSize || TILE_SIZE;
    const baseSpriteHeight =
      animationConfig?.height || animationConfig?.tileSize || TILE_SIZE;
    const scaledWidth = baseSpriteWidth * SCALE * overlayScale;
    const scaledHeight = baseSpriteHeight * SCALE * overlayScale;

    // Calculate base tile position (match the exact positioning from renderTile)
    const baseTileX = x * (TILE_SIZE * SCALE - TILE_OVERLAP);
    const baseTileY = y * (TILE_SIZE * SCALE - TILE_OVERLAP);

    // Center the world (same as base tiles)
    const worldCenterOffsetX =
      (400 - CUSTOM_WORLD_CONFIG.WIDTH * TILE_SIZE * SCALE) / 2;
    const worldCenterOffsetY =
      (400 - CUSTOM_WORLD_CONFIG.HEIGHT * TILE_SIZE * SCALE) / 2;

    // Calculate how to position the overlay so the tree base is centered on the grass tile
    const baseTileSize = TILE_SIZE * SCALE;
    const overlayCenterOffsetX = (scaledWidth - baseTileSize) / 2; // Center horizontally

    // For vertical positioning: we want tree base (not sprite bottom) at grass center
    // Account for transparent pixels at bottom of tree sprites
    const transparencyOffset = TREE_TRANSPARENCY_OFFSET[overlayType] || 0;
    const scaledTransparencyOffset = transparencyOffset * SCALE * overlayScale;

    // Grass center Y = baseTileY + baseTileSize/2
    // Visual tree base Y = tree top Y + scaledHeight - scaledTransparencyOffset
    // So: tree top Y = (grass center Y) - scaledHeight + scaledTransparencyOffset
    const grassCenterY = baseTileSize / 2;
    const treeTopOffset =
      grassCenterY - scaledHeight + scaledTransparencyOffset;

    const animated = isAnimatedTile(overlayType);

    // Calculate canopy height (top portion of tree)
    const canopyHeight = scaledHeight * splitRatio.canopyRatio;

    return (
      <View
        key={`tree-canopy-${x}-${y}`}
        style={[
          styles.overlay,
          {
            position: "absolute",
            left: baseTileX + worldCenterOffsetX - overlayCenterOffsetX,
            top: baseTileY + worldCenterOffsetY + treeTopOffset, // Position at top of tree
            width: scaledWidth,
            height: canopyHeight,
            overflow: "hidden",
            zIndex: y + 70, // Y-based z-index (above character and tree bases)
            pointerEvents: "none", // Don't intercept touch events
          },
        ]}
      >
        {animated && animationConfig ? (
          <SimpleAnimatedSprite
            spriteSheet={asset}
            frameCount={animationConfig.frameCount}
            frameDuration={animationConfig.frameDuration}
            tileSize={
              animationConfig.width || animationConfig.tileSize || TILE_SIZE
            }
            width={scaledWidth}
            height={scaledHeight}
            playing={true}
          />
        ) : (
          <Image
            source={asset}
            style={[
              styles.overlayImage,
              { width: scaledWidth, height: scaledHeight },
            ]}
            resizeMode="stretch"
          />
        )}
      </View>
    );
  };

  const tiles = [];
  const overlays = [];
  const treeBases = [];
  const treeCanopies = [];

  for (let y = 0; y < CUSTOM_WORLD_CONFIG.HEIGHT; y++) {
    for (let x = 0; x < CUSTOM_WORLD_CONFIG.WIDTH; x++) {
      tiles.push(renderTile(x, y));
      overlays.push(renderOverlay(x, y));
      treeBases.push(renderTreeBase(x, y));
      treeCanopies.push(renderTreeCanopy(x, y));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.world}>
        {tiles}
        {overlays}
        {treeBases}
        {renderPlayer()}
        {treeCanopies}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Darker background for classic game feel
    justifyContent: "center",
    alignItems: "center",
  },
  world: {
    width: 400,
    height: 400,
    position: "relative",
    backgroundColor: "#2a2a2a", // Slightly lighter for the world area
    borderRadius: 8,
  },
  tile: {
    position: "absolute",
    width: TILE_SIZE * SCALE,
    height: TILE_SIZE * SCALE,
    // Fix for tile seams
    marginRight: -0.5,
    marginBottom: -0.5,
  },
  tileButton: {
    width: "100%",
    height: "100%",
  },
  tileImage: {
    width: "100%",
    height: "100%",
    // Prevent anti-aliasing seams
    resizeMode: "stretch",
  },
  overlay: {
    position: "absolute",
    // Dynamic width and height set in renderOverlay
    // Trees and decorations positioning handled dynamically
  },
  overlayImage: {
    width: "100%",
    height: "100%",
  },
  player: {
    position: "absolute",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  playerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e74c3c",
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CustomTileWorld;
