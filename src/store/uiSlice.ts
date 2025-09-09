import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types/game";

interface ModalState {
  itemDetails: {
    isOpen: boolean;
    item: Item | null;
    quantity: number;
    slotId: string | null;
  };
}

const initialState: ModalState = {
  itemDetails: {
    isOpen: false,
    item: null,
    quantity: 0,
    slotId: null,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openItemDetailsModal: (
      state,
      action: PayloadAction<{
        item: Item;
        quantity: number;
        slotId: string;
      }>
    ) => {
      state.itemDetails = {
        isOpen: true,
        item: action.payload.item,
        quantity: action.payload.quantity,
        slotId: action.payload.slotId,
      };
    },
    closeItemDetailsModal: (state) => {
      state.itemDetails = {
        isOpen: false,
        item: null,
        quantity: 0,
        slotId: null,
      };
    },
  },
});

export const { openItemDetailsModal, closeItemDetailsModal } = uiSlice.actions;

export default uiSlice.reducer;
