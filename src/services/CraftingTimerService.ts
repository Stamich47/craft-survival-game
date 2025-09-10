import { store } from "../store";
import { completeCrafting } from "../store/craftingSlice";
import { addItem, removeItem } from "../store/inventorySlice";
import { gainExperience } from "../store/playerSlice";
import { RECIPES, ITEMS } from "../data";

class CraftingTimerService {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;
  private completionCallbacks: Array<
    (itemName: string, quantity: number) => void
  > = [];

  start() {
    if (this.isRunning) {
      console.log("CraftingTimerService already running");
      return;
    }

    console.log("Starting CraftingTimerService");
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      this.checkCraftingProgress();
    }, 500); // Check every 500ms
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log("CraftingTimerService stopped");
  }

  // Add callback for when crafting completes
  onCraftingComplete(callback: (itemName: string, quantity: number) => void) {
    this.completionCallbacks.push(callback);
  }

  // Remove callback
  removeCompletionCallback(
    callback: (itemName: string, quantity: number) => void
  ) {
    this.completionCallbacks = this.completionCallbacks.filter(
      (cb) => cb !== callback
    );
  }

  private checkCraftingProgress() {
    const state = store.getState();
    const { currentCraft } = state.crafting;

    if (!currentCraft?.isActive || !currentCraft.startTime) {
      return;
    }

    // Find the recipe
    const recipe = RECIPES[currentCraft.recipeId];
    if (!recipe) {
      console.error("Recipe not found:", currentCraft.recipeId);
      store.dispatch(completeCrafting());
      return;
    }

    // Check if crafting time has elapsed
    const elapsed = (Date.now() - currentCraft.startTime) / 1000;
    if (elapsed >= recipe.craftingTime) {
      console.log("🎉 Background crafting completed:", recipe.name);

      // First, remove ingredients from inventory
      console.log("� Removing ingredients...");
      for (const ingredient of recipe.ingredients) {
        const ingredientItem = ITEMS[ingredient.itemId];
        if (ingredientItem) {
          store.dispatch(
            removeItem({
              itemId: ingredient.itemId,
              quantity: ingredient.quantity,
            })
          );
          console.log(
            `➖ Removed ${ingredient.quantity}x ${ingredientItem.name}`
          );
        } else {
          console.error("❌ Ingredient item not found:", ingredient.itemId);
        }
      }

      // Then, add result item to inventory
      console.log("📦 Adding result item:", recipe.result);
      const resultItem = ITEMS[recipe.result.itemId];
      if (resultItem) {
        store.dispatch(
          addItem({
            item: resultItem,
            quantity: recipe.result.quantity,
          })
        );
        console.log(`➕ Added ${recipe.result.quantity}x ${resultItem.name}`);
      } else {
        console.error("❌ Result item not found:", recipe.result.itemId);
      }

      // Award XP for crafting
      const xpGained = recipe.result.quantity * 10; // 10 XP per item crafted
      store.dispatch(gainExperience(xpGained));
      console.log(`🌟 Gained ${xpGained} XP for crafting ${recipe.name}`);

      // Clear the crafting state
      console.log("🧹 Clearing crafting state...");
      store.dispatch(completeCrafting());

      // Verify state was cleared
      const newState = store.getState();
      console.log(
        "🔍 Crafting state after completion:",
        newState.crafting.currentCraft
      );

      console.log(`✨ Crafted ${recipe.name} in background!`);

      // Notify all registered callbacks with the result item details
      if (resultItem) {
        this.completionCallbacks.forEach((callback) => {
          callback(resultItem.name, recipe.result.quantity);
        });
      }
    }
  }

  // Get current crafting progress (0-100)
  getCraftingProgress(): number {
    const state = store.getState();
    const { currentCraft } = state.crafting;

    if (!currentCraft?.isActive || !currentCraft.startTime) {
      return 0;
    }

    const recipe = RECIPES[currentCraft.recipeId];
    if (!recipe) {
      return 0;
    }

    const elapsed = (Date.now() - currentCraft.startTime) / 1000;
    const progress = Math.min(100, (elapsed / recipe.craftingTime) * 100);

    return progress;
  }

  isActive(): boolean {
    const state = store.getState();
    return state.crafting.currentCraft?.isActive || false;
  }
}

// Export singleton instance
export const craftingTimer = new CraftingTimerService();
