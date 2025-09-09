import { Inventory, Item, InventorySlot } from "../types";

export const findItemInInventory = (
  inventory: Inventory,
  itemId: string
): InventorySlot | null => {
  return (
    inventory.slots.find(
      (slot) => slot.item?.id === itemId && slot.quantity > 0
    ) || null
  );
};

export const getItemQuantity = (
  inventory: Inventory,
  itemId: string
): number => {
  return inventory.slots
    .filter((slot) => slot.item?.id === itemId)
    .reduce((total, slot) => total + slot.quantity, 0);
};

export const hasEnoughItems = (
  inventory: Inventory,
  itemId: string,
  requiredQuantity: number
): boolean => {
  return getItemQuantity(inventory, itemId) >= requiredQuantity;
};

export const getInventoryValue = (inventory: Inventory): number => {
  return inventory.slots.reduce((total, slot) => {
    if (slot.item && slot.quantity > 0) {
      return total + slot.item.value * slot.quantity;
    }
    return total;
  }, 0);
};

export const getUsedSlots = (inventory: Inventory): number => {
  return inventory.slots.filter((slot) => slot.item !== null).length;
};

export const getAvailableSlots = (inventory: Inventory): number => {
  return inventory.maxSlots - getUsedSlots(inventory);
};

export const isInventoryFull = (inventory: Inventory): boolean => {
  return getAvailableSlots(inventory) === 0;
};

export const canAddItem = (
  inventory: Inventory,
  item: Item,
  quantity: number
): boolean => {
  if (!item.stackable) {
    return getAvailableSlots(inventory) >= quantity;
  }

  // Check existing stacks
  const existingSlots = inventory.slots.filter(
    (slot) => slot.item?.id === item.id && slot.quantity < item.maxStack
  );

  let availableSpace = existingSlots.reduce(
    (space, slot) => space + (item.maxStack - slot.quantity),
    0
  );

  // Add empty slots
  availableSpace += getAvailableSlots(inventory) * item.maxStack;

  return availableSpace >= quantity;
};

export const getItemsByType = (
  inventory: Inventory,
  itemType: string
): InventorySlot[] => {
  return inventory.slots.filter(
    (slot) => slot.item?.type === itemType && slot.quantity > 0
  );
};

export const sortInventory = (inventory: Inventory): Inventory => {
  const nonEmptySlots = inventory.slots
    .filter((slot) => slot.item !== null)
    .sort((a, b) => {
      // Sort by item type first, then by name
      if (a.item!.type !== b.item!.type) {
        return a.item!.type.localeCompare(b.item!.type);
      }
      return a.item!.name.localeCompare(b.item!.name);
    });

  const emptySlots = inventory.slots.filter((slot) => slot.item === null);

  return {
    ...inventory,
    slots: [...nonEmptySlots, ...emptySlots],
  };
};
