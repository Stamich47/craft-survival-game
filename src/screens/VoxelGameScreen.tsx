import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  // generateWorld removed - no more procedural generation
  generateFlatWorldOne,
  generateBasicWorld,
  WorldType,
  setCameraPosition,
  moveCharacter,
  resetWorld,
  setWorldType,
} from "../store/worldSlice";
import { SVGTileWorld } from "../components/game/SVGTileWorld";
import { WorldOneTileWorld } from "../components/game/WorldOneTileWorld";
import { BasicTileWorld } from "../components/game/BasicTileWorld";
import { CustomTileWorld } from "../components/game/CustomTileWorld";
import {
  HorizontalPlayerStats,
  CraftingProgressOverlay,
} from "../components/game";
import { ToastNotification } from "../components/ui/ToastNotification";
import { craftingTimer } from "../services/CraftingTimerService";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Convert screen coordinates to tile coordinates
const screenToTile = (
  screenX: number,
  screenY: number,
  tileSize: number,
  offsetX: number,
  offsetY: number,
  characterX: number,
  characterY: number
) => {
  // Character is always at screen center (adjusted for UI)
  const characterScreenX = screenWidth / 2;
  const characterScreenY = screenHeight / 2 - 50;

  // Calculate the difference from character screen position, accounting for world offset
  const deltaX = screenX - characterScreenX - offsetX;
  const deltaY = screenY - characterScreenY - offsetY;

  // Convert screen delta to tile delta using inverse isometric transformation
  // Forward: isoX = (x - y) * (tileSize / 2), isoY = (x + y) * (tileSize / 4)

  const xMinusY = deltaX / (tileSize / 2);
  const xPlusY = deltaY / (tileSize / 4);

  const tileDeltaX = (xMinusY + xPlusY) / 2;
  const tileDeltaY = (xPlusY - xMinusY) / 2;

  const tileX = Math.round(characterX + tileDeltaX);
  const tileY = Math.round(characterY + tileDeltaY);

  return { x: tileX, y: tileY };
};

export const VoxelGameScreen: React.FC = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.world.tiles);
  const character = useSelector((state: RootState) => state.world.character);
  const camera = useSelector((state: RootState) => state.world.camera);
  const worldType = useSelector((state: RootState) => state.world.worldType);
  const isLoaded = useSelector((state: RootState) => state.world.isLoaded);
  const player = useSelector((state: RootState) => state.player.player);

  // Toast notification state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Function to show craft completion notification
  const showCraftingNotification = (itemName: string, quantity: number) => {
    setToastMessage(`(+${quantity} ${itemName}!)`);
    setToastVisible(true);
  };

  // Initialize the world when component mounts - DISABLED for custom world
  useEffect(() => {
    // World One is pre-loaded, no need to generate
    // Only generate if explicitly not loaded and not World One
    if (!isLoaded && worldType !== WorldType.WORLD_ONE) {
      console.log("Generating basic world for testing");
      dispatch(generateBasicWorld());
    }
  }, [dispatch, isLoaded, worldType]);

  // Register for background crafting notifications
  useEffect(() => {
    craftingTimer.onCraftingComplete(showCraftingNotification);

    return () => {
      craftingTimer.removeCompletionCallback(showCraftingNotification);
    };
  }, []);

  const handleTilePress = (event: any) => {
    if (!character || !camera || !tiles) {
      console.log(
        "Missing data - character:",
        !!character,
        "camera:",
        !!camera,
        "tiles:",
        !!tiles
      );
      return;
    }

    const { locationX, locationY } = event.nativeEvent;

    const tileCoords = screenToTile(
      locationX,
      locationY,
      40, // tileSize
      camera.offsetX,
      camera.offsetY,
      character.x, // characterX
      character.y // characterY
    );

    console.log(
      "Tap -> Tile:",
      tileCoords.x,
      tileCoords.y,
      "| Current pos:",
      character.x,
      character.y
    );
    dispatch(moveCharacter({ x: tileCoords.x, y: tileCoords.y }));
  };

  // Removed regenerateWorld and forceNewWorld - no more procedural generation

  // Check loading state - World One doesn't need tiles array
  const needsLoading = !isLoaded && worldType !== WorldType.WORLD_ONE;
  const needsTiles =
    worldType !== WorldType.WORLD_ONE && (!tiles || tiles.length === 0);

  if (needsLoading || needsTiles) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading World...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Horizontal Stats Header */}
      <HorizontalPlayerStats />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.cameraInfo}>
          <Text style={styles.infoText}>
            Character: ({character?.x || 0}, {character?.y || 0})
          </Text>
        </View>
      </View>

      {/* Tile World - Takes up most of the screen */}
      <TouchableWithoutFeedback onPress={handleTilePress}>
        <View style={styles.worldContainer}>
          {worldType === WorldType.WORLD_ONE ? (
            // World One doesn't need tiles array - it has its own data
            <CustomTileWorld />
          ) : tiles && character && camera && worldType ? (
            <>
              {worldType === WorldType.BASIC_WORLD ? (
                <BasicTileWorld
                  tiles={tiles}
                  character={character}
                  tileSize={64}
                  offsetX={camera.offsetX}
                  offsetY={camera.offsetY}
                />
              ) : worldType === WorldType.FLAT_WORLD_ONE ? (
                <WorldOneTileWorld
                  tiles={tiles}
                  character={character}
                  tileSize={48}
                  offsetX={camera.offsetX}
                  offsetY={camera.offsetY}
                />
              ) : (
                <SVGTileWorld
                  tiles={tiles}
                  character={character}
                  tileSize={40}
                  offsetX={camera.offsetX}
                  offsetY={camera.offsetY}
                />
              )}
            </>
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      {/* Minimal Bottom Controls */}
      <View style={styles.bottomControls}>
        <Text style={styles.controlsText}>
          Tap on tiles to move your character
        </Text>

        {/* World Type Testing Buttons */}
        <View style={styles.worldTypeControls}>
          <TouchableOpacity
            style={[
              styles.worldButton,
              worldType === WorldType.BASIC_WORLD && styles.activeWorldButton,
            ]}
            onPress={() => dispatch(generateBasicWorld())}
          >
            <Text style={styles.worldButtonText}>Basic 6x6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.worldButton,
              worldType === WorldType.FLAT_WORLD_ONE &&
                styles.activeWorldButton,
            ]}
            onPress={() =>
              dispatch(generateFlatWorldOne({ width: 30, height: 30 }))
            }
          >
            <Text style={styles.worldButtonText}>Legacy World</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.worldButton,
              worldType === WorldType.WORLD_ONE && styles.activeWorldButton,
            ]}
            onPress={() => dispatch(setWorldType(WorldType.WORLD_ONE))}
          >
            <Text style={styles.worldButtonText}>World One</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Crafting Progress Overlay */}
      <CraftingProgressOverlay />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB", // Sky blue background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  regenerateButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  cameraInfo: {
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#333",
  },
  worldContainer: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },
  bottomControls: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
  },
  controlsText: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  worldTypeControls: {
    flexDirection: "row",
    gap: 12,
  },
  worldButton: {
    backgroundColor: "#666",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeWorldButton: {
    backgroundColor: "#4CAF50",
  },
  worldButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});
