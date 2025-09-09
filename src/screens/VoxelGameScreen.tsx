import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  generateWorld,
  moveCamera,
  setCameraPosition,
  VoxelType,
} from "../store/worldSlice";
import { SVGVoxelWorld } from "../components/game/SVGVoxelWorld";
import { HorizontalPlayerStats } from "../components/game";

const { width, height } = Dimensions.get("window");

export const VoxelGameScreen: React.FC = () => {
  const dispatch = useDispatch();
  const world = useSelector((state: RootState) => state.world.world);
  const camera = useSelector((state: RootState) => state.world.camera);
  const isLoaded = useSelector((state: RootState) => state.world.isLoaded);
  const player = useSelector((state: RootState) => state.player.player);

  // Initialize the world when component mounts
  useEffect(() => {
    if (!isLoaded) {
      dispatch(generateWorld({ width: 12, height: 12, depth: 6 }));
    }
  }, [dispatch, isLoaded]);

  // Pan responder for camera movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Move camera based on gesture
      dispatch(
        moveCamera({
          deltaX: gestureState.dx * 0.5,
          deltaY: gestureState.dy * 0.5,
        })
      );
    },
    onPanResponderRelease: () => {
      // Could add momentum scrolling here
    },
  });

  const regenerateWorld = () => {
    dispatch(generateWorld({ width: 12, height: 12, depth: 6 }));
    dispatch(setCameraPosition({ x: 0, y: 0 }));
  };

  if (!isLoaded || !world.length) {
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
            Camera: ({Math.round(camera.offsetX)}, {Math.round(camera.offsetY)})
          </Text>
        </View>
      </View>

      {/* Voxel World - Takes up most of the screen */}
      <View style={styles.worldContainer} {...panResponder.panHandlers}>
        <SVGVoxelWorld
          world={world}
          tileSize={40}
          offsetX={camera.offsetX}
          offsetY={camera.offsetY}
        />
      </View>

      {/* Minimal Bottom Controls */}
      <View style={styles.bottomControls}>
        <Text style={styles.controlsText}>
          Pan to move camera around the world
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
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  regenerateButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  worldContainer: {
    flex: 1, // Takes up most of the screen
    overflow: "hidden",
  },
  bottomControls: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  controlsText: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  cameraInfo: {
    flex: 1,
    alignItems: "center",
  },
  infoText: {
    color: "#999",
    fontSize: 10,
    fontFamily: "monospace",
  },
});
