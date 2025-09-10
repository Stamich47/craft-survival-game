import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

interface SimpleAnimatedSpriteProps {
  spriteSheet: any;
  frameCount: number;
  frameDuration: number;
  tileSize: number;
  width: number;
  height: number;
  playing?: boolean;
}

export const SimpleAnimatedSprite: React.FC<SimpleAnimatedSpriteProps> = ({
  spriteSheet,
  frameCount,
  frameDuration,
  tileSize,
  width,
  height,
  playing = true,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCount);
    }, frameDuration);

    return () => clearInterval(interval);
  }, [playing, frameCount, frameDuration]);

  // Calculate the position of the current frame in the sprite sheet
  const frameX = currentFrame * tileSize;

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      <Image
        source={spriteSheet}
        style={{
          width: width * frameCount, // Scale the entire sprite sheet
          height: height,
          marginLeft: -frameX * (width / tileSize), // Offset to show current frame
        }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default SimpleAnimatedSprite;
