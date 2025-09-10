// Animated Sprite Component
// Handles frame-based animation for water tiles and other animated sprites

import React, { useEffect, useState, memo, useRef } from "react";
import { Image, View, StyleSheet } from "react-native";
import {
  WorldOneTileType,
  getAssetForTileType,
} from "../../constants/worldOneAssets";
import {
  getWaterFrame,
  getWaterSpritePosition,
  WATER_CONFIG,
} from "../../utils/spriteUtils";

interface AnimatedSpriteProps {
  tileType: WorldOneTileType;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: any;
  onAnimationFrame?: (frame: number) => void;
}

export const AnimatedSprite = memo<AnimatedSpriteProps>(
  ({ tileType, x, y, width, height, style, onAnimationFrame }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [timestamp, setTimestamp] = useState(Date.now());
    const animationRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      // Only animate water tiles
      if (
        tileType < WorldOneTileType.WATER_FLAT_1 ||
        tileType > WorldOneTileType.WATER_ELEVATION_4
      ) {
        return;
      }

      const animate = () => {
        const now = Date.now();
        setTimestamp(now);

        const frame = getWaterFrame(tileType, now);
        setCurrentFrame(frame);

        if (onAnimationFrame) {
          onAnimationFrame(frame);
        }
      };

      // Start animation
      animate();
      animationRef.current = setInterval(animate, WATER_CONFIG.ANIMATION_SPEED);

      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
      };
    }, [tileType, onAnimationFrame]);

    const assetSource = getAssetForTileType(tileType);

    if (!assetSource) {
      return null;
    }

    // For water animations, we need to clip to the correct frame
    if (
      tileType >= WorldOneTileType.WATER_FLAT_1 &&
      tileType <= WorldOneTileType.WATER_ELEVATION_4
    ) {
      const spritePosition = getWaterSpritePosition(currentFrame);

      return (
        <View
          style={[
            {
              position: "absolute",
              left: x,
              top: y,
              width,
              height,
              overflow: "hidden",
            },
            style,
          ]}
        >
          <Image
            source={assetSource}
            style={[
              styles.animatedSprite,
              {
                left: -spritePosition.sourceX,
                top: -spritePosition.sourceY,
                width: WATER_CONFIG.FRAME_WIDTH * WATER_CONFIG.FRAME_COUNT, // Full sprite sheet width
                height: WATER_CONFIG.FRAME_HEIGHT, // Single frame height
              },
            ]}
            resizeMode="stretch"
          />
        </View>
      );
    }

    // For non-animated sprites, render normally
    return (
      <Image
        source={assetSource}
        style={[
          {
            position: "absolute",
            left: x,
            top: y,
            width,
            height,
          },
          style,
        ]}
        resizeMode="contain"
      />
    );
  }
);

AnimatedSprite.displayName = "AnimatedSprite";

const styles = StyleSheet.create({
  animatedSprite: {
    position: "absolute",
  },
});

// Hook for managing multiple animated sprites efficiently
export const useAnimatedSprites = (
  sprites: Array<{ id: string; tileType: WorldOneTileType }>
) => {
  const [frameStates, setFrameStates] = useState<Record<string, number>>({});

  useEffect(() => {
    const animatedSprites = sprites.filter(
      (sprite) =>
        sprite.tileType >= WorldOneTileType.WATER_FLAT_1 &&
        sprite.tileType <= WorldOneTileType.WATER_ELEVATION_4
    );

    if (animatedSprites.length === 0) {
      return;
    }

    const updateFrames = () => {
      const now = Date.now();
      const newFrameStates: Record<string, number> = {};

      animatedSprites.forEach((sprite) => {
        const frame = getWaterFrame(sprite.tileType, now);
        newFrameStates[sprite.id] = frame;
      });

      setFrameStates((prev) => {
        // Only update if frames actually changed to avoid unnecessary re-renders
        const hasChanged = animatedSprites.some(
          (sprite) => prev[sprite.id] !== newFrameStates[sprite.id]
        );

        return hasChanged ? newFrameStates : prev;
      });
    };

    // Initial frame calculation
    updateFrames();

    // Set up animation interval
    const interval = setInterval(updateFrames, WATER_CONFIG.ANIMATION_SPEED);

    return () => {
      clearInterval(interval);
    };
  }, [sprites]);

  const getCurrentFrame = (spriteId: string): number => {
    return frameStates[spriteId] ?? 0;
  };

  return { getCurrentFrame };
};
