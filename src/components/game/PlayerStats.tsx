import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProgressBar } from "../ui";

export const PlayerStats: React.FC = () => {
  const player = useSelector((state: RootState) => state.player.player);

  if (!player) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ProgressBar
        current={player.health}
        max={player.maxHealth}
        label="Health"
        color={["#e74c3c", "#c0392b"]}
      />
      <ProgressBar
        current={player.hunger}
        max={player.maxHunger}
        label="Hunger"
        color={["#f39c12", "#e67e22"]}
      />
      <ProgressBar
        current={player.thirst}
        max={player.maxThirst}
        label="Thirst"
        color={["#3498db", "#2980b9"]}
      />
      <ProgressBar
        current={player.energy}
        max={player.maxEnergy}
        label="Energy"
        color={["#2ecc71", "#27ae60"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 16,
    borderRadius: 12,
    margin: 8,
  },
});
