import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, Position } from "../types";

interface PlayerState {
  player: Player | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  player: null,
  isLoading: false,
  error: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    createPlayer: (state, action: PayloadAction<Omit<Player, "id">>) => {
      state.player = {
        id: Date.now().toString(),
        ...action.payload,
      };
    },
    updatePlayerStats: (
      state,
      action: PayloadAction<
        Partial<Pick<Player, "health" | "hunger" | "thirst" | "energy">>
      >
    ) => {
      if (state.player) {
        Object.assign(state.player, action.payload);
      }
    },
    movePlayer: (state, action: PayloadAction<Position>) => {
      if (state.player) {
        state.player.position = action.payload;
      }
    },
    gainExperience: (state, action: PayloadAction<number>) => {
      if (state.player) {
        state.player.experience += action.payload;
        // Simple level calculation
        const newLevel = Math.floor(state.player.experience / 100) + 1;
        if (newLevel > state.player.level) {
          state.player.level = newLevel;
          // Level up bonuses
          state.player.maxHealth += 10;
          state.player.health = state.player.maxHealth;
        }
      }
    },
    healPlayer: (state, action: PayloadAction<number>) => {
      if (state.player) {
        state.player.health = Math.min(
          state.player.health + action.payload,
          state.player.maxHealth
        );
      }
    },
    consumeFood: (
      state,
      action: PayloadAction<{ hunger: number; thirst: number }>
    ) => {
      if (state.player) {
        state.player.hunger = Math.min(
          state.player.hunger + action.payload.hunger,
          state.player.maxHunger
        );
        state.player.thirst = Math.min(
          state.player.thirst + action.payload.thirst,
          state.player.maxThirst
        );
      }
    },
    restPlayer: (state, action: PayloadAction<number>) => {
      if (state.player) {
        state.player.energy = Math.min(
          state.player.energy + action.payload,
          state.player.maxEnergy
        );
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  createPlayer,
  updatePlayerStats,
  movePlayer,
  gainExperience,
  healPlayer,
  consumeFood,
  restPlayer,
  setLoading,
  setError,
} = playerSlice.actions;

export default playerSlice.reducer;
