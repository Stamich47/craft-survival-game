import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { InventorySlot as InventorySlotType } from "../../types";

interface InventorySlotProps {
  slot: InventorySlotType;
  onPress?: (slot: InventorySlotType) => void;
  size?: number;
}

export const InventorySlot: React.FC<InventorySlotProps> = ({
  slot,
  onPress,
  size = 80,
}) => {
  const handlePress = () => {
    if (onPress && slot.item) {
      onPress(slot);
    }
  };

  return (
    <View style={styles.slotContainer}>
      <TouchableOpacity
        style={[styles.slot, { width: size, height: size }]}
        onPress={handlePress}
        disabled={!onPress || !slot.item}
      >
        {slot.item ? (
          <>
            {slot.item.icon ? (
              <Image source={slot.item.icon} style={styles.itemIcon} />
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
      {slot.item && (
        <Text style={styles.itemName} numberOfLines={2}>
          {slot.item.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    alignItems: "center",
    margin: 4, // Margin for spacing between slots
    width: 80, // Fixed width for consistent 4-column layout
  },
  slot: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#444",
    padding: 4,
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
  itemName: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
    width: 80,
    lineHeight: 12,
  },
});
