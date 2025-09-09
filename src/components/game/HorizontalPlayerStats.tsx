import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { width } = Dimensions.get("window");

export const HorizontalPlayerStats: React.FC = () => {
  const player = useSelector((state: RootState) => state.player.player);

  if (!player) {
    return null;
  }

  // Calculate percentage for progress bars
  const healthPercent = (player.health / player.maxHealth) * 100;
  const hungerPercent = (player.hunger / player.maxHunger) * 100;
  const thirstPercent = (player.thirst / player.maxThirst) * 100;
  const energyPercent = (player.energy / player.maxEnergy) * 100;

  const StatBar = ({
    label,
    value,
    maxValue,
    percent,
    color,
    bgColor = "#333",
  }: {
    label: string;
    value: number;
    maxValue: number;
    percent: number;
    color: string;
    bgColor?: string;
  }) => (
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBarBackground, { backgroundColor: bgColor }]}>
          <View
            style={[
              styles.statBarFill,
              { width: `${percent}%`, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={styles.statValue}>
          {value}/{maxValue}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerLevel}>Level {player.level}</Text>
        <Text style={styles.playerXP}>{player.experience} XP</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatBar
          label="HP"
          value={player.health}
          maxValue={player.maxHealth}
          percent={healthPercent}
          color="#e74c3c"
        />
        <StatBar
          label="Hunger"
          value={player.hunger}
          maxValue={player.maxHunger}
          percent={hungerPercent}
          color="#f39c12"
        />
        <StatBar
          label="Thirst"
          value={player.thirst}
          maxValue={player.maxThirst}
          percent={thirstPercent}
          color="#3498db"
        />
        <StatBar
          label="Energy"
          value={player.energy}
          maxValue={player.maxEnergy}
          percent={energyPercent}
          color="#2ecc71"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    alignItems: "center",
  },
  playerInfo: {
    minWidth: 80,
    marginRight: 16,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  playerLevel: {
    fontSize: 12,
    color: "#4CAF50",
    marginBottom: 1,
  },
  playerXP: {
    fontSize: 10,
    color: "#ccc",
  },
  statsGrid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 10,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 2,
    fontWeight: "600",
  },
  statBarContainer: {
    alignItems: "center",
  },
  statBarBackground: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 2,
  },
  statBarFill: {
    height: "100%",
    borderRadius: 4,
    minWidth: 2,
  },
  statValue: {
    fontSize: 9,
    color: "#fff",
    fontWeight: "500",
  },
});
