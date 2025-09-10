import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  generateWorld,
  setCameraPosition,
  moveCharacter,
} from "../store/worldSlice";
import { SVGTileWorld } from "../components/game/SVGTileWorld";
import { HorizontalPlayerStats } from "../components/game";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Convert screen coordinates to tile coordinates
const screenToTile = (
  screenX: number,
  screenY: number,
  tileSize: number,
  offsetX: number,
  offsetY: number
) => {
  // Adjust for camera offset and screen center
  const adjustedX = screenX - screenWidth / 2 - offsetX;
  const adjustedY = screenY - screenHeight / 2 - offsetY;

  // Convert from isometric to tile coordinates
  const tileX = Math.round(
    (adjustedX / (tileSize / 2) + adjustedY / (tileSize / 4)) / 2
  );
  const tileY = Math.round(
    (adjustedY / (tileSize / 4) - adjustedX / (tileSize / 2)) / 2
  );

  return { x: tileX, y: tileY };
};

export const VoxelGameScreen: React.FC = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.world.tiles);
  const character = useSelector((state: RootState) => state.world.character);
  const camera = useSelector((state: RootState) => state.world.camera);
  const isLoaded = useSelector((state: RootState) => state.world.isLoaded);
  const player = useSelector((state: RootState) => state.player.player);

  // Initialize the world when component mounts
  useEffect(() => {
    if (!isLoaded) {
      dispatch(generateWorld({ width: 20, height: 20 }));
    }
  }, [dispatch, isLoaded]);

  const handleTilePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const tileCoords = screenToTile(
      locationX,
      locationY,
      40, // tileSize
      camera.offsetX,
      camera.offsetY
    );

    console.log("Tapped tile:", tileCoords.x, tileCoords.y);
    dispatch(moveCharacter({ x: tileCoords.x, y: tileCoords.y }));
  };

  const regenerateWorld = () => {
    dispatch(generateWorld({ width: 20, height: 20 }));
    dispatch(setCameraPosition({ x: 0, y: 0 }));
  };

  if (!isLoaded || !tiles.length) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Generating World...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Horizontal Stats Header */}
      <HorizontalPlayerStats />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.regenerateButton}
          onPress={regenerateWorld}
        >
          <Text style={styles.buttonText}>New World</Text>
        </TouchableOpacity>
        <View style={styles.cameraInfo}>
          <Text style={styles.infoText}>
            Character: ({character.x}, {character.y})
          </Text>
        </View>
      </View>

      {/* Tile World - Takes up most of the screen */}
      <View style={styles.worldContainer} onTouchEnd={handleTilePress}>
        <SVGTileWorld
          tiles={tiles}
          character={character}
          tileSize={40}
          offsetX={camera.offsetX}
          offsetY={camera.offsetY}
        />
      </View>

      {/* Minimal Bottom Controls */}
      <View style={styles.bottomControls}>
        <Text style={styles.controlsText}>
          Tap on tiles to move your character
        </Text>
      </View>
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
  },
});
