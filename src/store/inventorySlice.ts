import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inventory, InventorySlot, Item } from "../types";

interface InventoryState {
  inventory: Inventory;
}

const createInitialInventory = (): Inventory => ({
  slots: Array.from({ length: 20 }, (_, index) => ({
    id: `slot-${index}`,
    item: null,
    quantity: 0,
  })),
  maxSlots: 20,
});

const initialState: InventoryState = {
  inventory: createInitialInventory(),
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ item: Item; quantity: number }>
    ) => {
      const { item, quantity } = action.payload;

      // Find existing slot with same item
      const existingSlot = state.inventory.slots.find(
        (slot) => slot.item?.id === item.id && slot.quantity < item.maxStack
      );

      if (existingSlot && item.stackable) {
        const spaceAvailable = item.maxStack - existingSlot.quantity;
        const toAdd = Math.min(quantity, spaceAvailable);
        existingSlot.quantity += toAdd;

        // If there's remaining quantity, try to find another slot or create new one
        const remaining = quantity - toAdd;
        if (remaining > 0) {
          const emptySlot = state.inventory.slots.find(
            (slot) => slot.item === null
          );
          if (emptySlot) {
            emptySlot.item = item;
            emptySlot.quantity = remaining;
          }
        }
      } else {
        // Find empty slot
        const emptySlot = state.inventory.slots.find(
          (slot) => slot.item === null
        );
        if (emptySlot) {
          emptySlot.item = item;
          emptySlot.quantity = quantity;
        }
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      let remainingToRemove = quantity;

      // Remove from slots starting from the first one
      for (const slot of state.inventory.slots) {
        if (slot.item?.id === itemId && remainingToRemove > 0) {
          const toRemove = Math.min(slot.quantity, remainingToRemove);
          slot.quantity -= toRemove;
          remainingToRemove -= toRemove;

          if (slot.quantity === 0) {
            slot.item = null;
          }
        }
      }
    },
    moveItem: (
      state,
      action: PayloadAction<{ fromSlotId: string; toSlotId: string }>
    ) => {
      const { fromSlotId, toSlotId } = action.payload;
      const fromSlot = state.inventory.slots.find(
        (slot) => slot.id === fromSlotId
      );
      const toSlot = state.inventory.slots.find((slot) => slot.id === toSlotId);

      if (fromSlot && toSlot) {
        // Simple swap for now
        const tempItem = fromSlot.item;
        const tempQuantity = fromSlot.quantity;

        fromSlot.item = toSlot.item;
        fromSlot.quantity = toSlot.quantity;

        toSlot.item = tempItem;
        toSlot.quantity = tempQuantity;
      }
    },
    upgradeInventory: (state, action: PayloadAction<number>) => {
      const newMaxSlots = action.payload;
      const currentSlots = state.inventory.slots.length;

      if (newMaxSlots > currentSlots) {
        const additionalSlots = Array.from(
          { length: newMaxSlots - currentSlots },
          (_, index) => ({
            id: `slot-${currentSlots + index}`,
            item: null,
            quantity: 0,
          })
        );
        state.inventory.slots.push(...additionalSlots);
        state.inventory.maxSlots = newMaxSlots;
      }
    },
    clearInventory: (state) => {
      state.inventory = createInitialInventory();
    },
    dropItem: (state, action: PayloadAction<{ slotId: string }>) => {
      const slot = state.inventory.slots.find(
        (s) => s.id === action.payload.slotId
      );
      if (slot) {
        slot.item = null;
        slot.quantity = 0;
      }
    },
    consumeItem: (state, action: PayloadAction<{ slotId: string }>) => {
      const slot = state.inventory.slots.find(
        (s) => s.id === action.payload.slotId
      );
      if (slot && slot.item) {
        if (slot.quantity > 1) {
          slot.quantity -= 1;
        } else {
          slot.item = null;
          slot.quantity = 0;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  moveItem,
  upgradeInventory,
  clearInventory,
  dropItem,
  consumeItem,
} = inventorySlice.actions;

export default inventorySlice.reducer;
