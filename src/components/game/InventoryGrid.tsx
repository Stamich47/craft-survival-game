import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { InventorySlot } from "../ui";

export const InventoryGrid: React.FC = () => {
  const inventory = useSelector(
    (state: RootState) => state.inventory.inventory
  );

  const renderSlot = ({ item }: { item: any }) => (
    <InventorySlot
      slot={item}
      onPress={() => {
        // Handle slot press (show item details, use item, etc.)
        console.log("Slot pressed:", item);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={inventory.slots}
        renderItem={renderSlot}
        keyExtractor={(item) => item.id}
        numColumns={5}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.slotCount}>
        {inventory.slots.filter((slot) => slot.item !== null).length} /{" "}
        {inventory.maxSlots}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.9)",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
  },
  slotCount: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
});
