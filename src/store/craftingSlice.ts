import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types";

interface CraftingState {
  discoveredRecipes: string[];
  availableRecipes: Recipe[];
  currentCraft: {
    recipeId: string;
    startTime: number;
    isActive: boolean;
  } | null;
}

const initialState: CraftingState = {
  discoveredRecipes: [],
  availableRecipes: [],
  currentCraft: null,
};

const craftingSlice = createSlice({
  name: "crafting",
  initialState,
  reducers: {
    discoverRecipe: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      console.log(
        "Discovering recipe:",
        recipeId,
        "Current discovered:",
        state.discoveredRecipes
      );
      if (!state.discoveredRecipes.includes(recipeId)) {
        state.discoveredRecipes.push(recipeId);
        console.log("Recipe discovered! New list:", state.discoveredRecipes);
      } else {
        console.log("Recipe already discovered");
      }
    },
    setAvailableRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.availableRecipes = action.payload;
    },
    startCrafting: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      const recipe = state.availableRecipes.find((r) => r.id === recipeId);

      console.log("Redux startCrafting action:", {
        recipeId,
        recipeFound: !!recipe,
        discoveredRecipes: state.discoveredRecipes,
        isDiscovered: state.discoveredRecipes.includes(recipeId),
      });

      if (recipe && state.discoveredRecipes.includes(recipeId)) {
        state.currentCraft = {
          recipeId,
          startTime: Date.now(),
          isActive: true,
        };
        console.log("Started crafting:", state.currentCraft);
      } else {
        console.log(
          "Cannot start crafting - recipe not found or not discovered"
        );
      }
    },
    updateCraftingProgress: (state, action: PayloadAction<number>) => {
      // This action is no longer needed with time-based crafting
    },
    checkCraftingComplete: (state) => {
      if (state.currentCraft && state.currentCraft.isActive) {
        const recipe = state.availableRecipes.find(
          (r) => r.id === state.currentCraft!.recipeId
        );
        if (recipe && state.currentCraft.startTime) {
          const elapsed = (Date.now() - state.currentCraft.startTime) / 1000;

          if (elapsed >= recipe.craftingTime) {
            state.currentCraft = null;
          }
        }
      }
    },
    updateCraftingByTime: (state) => {
      // This action is no longer needed since we calculate progress in the component
    },
    cancelCrafting: (state) => {
      state.currentCraft = null;
    },
    completeCrafting: (state) => {
      state.currentCraft = null;
    },
    clearActiveCrafting: (state) => {
      // Clear any active crafting on app initialization
      state.currentCraft = null;
    },
  },
});

export const {
  discoverRecipe,
  setAvailableRecipes,
  startCrafting,
  checkCraftingComplete,
  cancelCrafting,
  completeCrafting,
  clearActiveCrafting,
} = craftingSlice.actions;

export default craftingSlice.reducer;
