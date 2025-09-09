import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  color: string[];
  backgroundColor?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  color,
  backgroundColor = "#333",
  height = 20,
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.progressContainer, { height, backgroundColor }]}>
        <LinearGradient
          colors={color as any}
          style={[styles.progress, { width: `${percentage}%` }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <Text style={styles.progressText}>
          {Math.round(current)}/{max}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  progressContainer: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
