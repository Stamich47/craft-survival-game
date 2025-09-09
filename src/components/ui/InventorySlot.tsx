import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { InventorySlot as InventorySlotType } from "../../types";

interface InventorySlotProps {
  slot: InventorySlotType;
  onPress?: () => void;
  size?: number;
}

export const InventorySlot: React.FC<InventorySlotProps> = ({
  slot,
  onPress,
  size = 60,
}) => {
  return (
    <TouchableOpacity
      style={[styles.slot, { width: size, height: size }]}
      onPress={onPress}
      disabled={!onPress}
    >
      {slot.item ? (
        <>
          {slot.item.icon ? (
            <Image source={{ uri: slot.item.icon }} style={styles.itemIcon} />
          ) : (
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>
                {slot.item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {slot.quantity > 1 && (
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{slot.quantity}</Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptySlot} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slot: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#444",
    padding: 4,
    margin: 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  emptySlot: {
    flex: 1,
    width: "100%",
  },
  itemIcon: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  placeholderIcon: {
    width: "80%",
    height: "80%",
    backgroundColor: "#555",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#ff6b35",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  quantityText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
