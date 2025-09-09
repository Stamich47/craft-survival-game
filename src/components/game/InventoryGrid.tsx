import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  openItemDetailsModal,
  closeItemDetailsModal,
} from "../../store/uiSlice";
import { InventorySlot } from "../ui";
import { ItemDetailsModal } from "../ui/ItemDetailsModal";
import { dropItem, consumeItem } from "../../store/inventorySlice";
import { InventorySlot as InventorySlotType } from "../../types";

export const InventoryGrid: React.FC = () => {
  const dispatch = useDispatch();
  const inventory = useSelector(
    (state: RootState) => state.inventory.inventory
  );
  const modalState = useSelector((state: RootState) => state.ui.itemDetails);

  const handleSlotPress = (slot: InventorySlotType) => {
    if (slot.item) {
      dispatch(
        openItemDetailsModal({
          item: slot.item,
          quantity: slot.quantity,
          slotId: slot.id,
        })
      );
    }
  };

  const handleDrop = (itemId: string) => {
    if (modalState.slotId) {
      dispatch(dropItem({ slotId: modalState.slotId }));
    }
  };

  const handleConsume = (itemId: string) => {
    if (modalState.slotId) {
      dispatch(consumeItem({ slotId: modalState.slotId }));
      // Here you could add future survival mechanics like restoring hunger/thirst
    }
  };

  const renderSlot = ({ item }: { item: any }) => (
    <InventorySlot
      slot={item}
      size={72} // Good size for 4 columns - evenly spaced
      onPress={handleSlotPress}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        key="inventory-4-columns" // Force re-render when column count changes
        data={inventory.slots}
        renderItem={renderSlot}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.slotCount}>
        {inventory.slots.filter((slot) => slot.item !== null).length} /{" "}
        {inventory.maxSlots}
      </Text>

      <ItemDetailsModal
        visible={modalState.isOpen}
        item={modalState.item}
        quantity={modalState.quantity}
        onClose={() => dispatch(closeItemDetailsModal())}
        onDrop={handleDrop}
        onConsume={handleConsume}
      />
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
    alignItems: "center",
    paddingHorizontal: 12, // Adjusted padding for fixed-width slots
  },
  slotCount: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
});
