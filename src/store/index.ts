import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import playerReducer from "./playerSlice";
import inventoryReducer from "./inventorySlice";
import craftingReducer from "./craftingSlice";

const persistConfig = {
  key: "root",
  version: 4, // Increment this to force a fresh start after schema changes
  storage: AsyncStorage,
  whitelist: ["player", "inventory", "crafting"], // Persist all reducers, but clear active crafting on load
  debug: __DEV__, // Add debug logging in development
};

const rootReducer = combineReducers({
  player: playerReducer,
  inventory: inventoryReducer,
  crafting: craftingReducer,
});

// DEVELOPMENT: Temporarily disable persist completely for testing
const USE_PERSISTENCE = false; // Set to true to re-enable persistence

const finalReducer = USE_PERSISTENCE
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const store = configureStore({
  reducer: finalReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: USE_PERSISTENCE
          ? ["persist/PERSIST", "persist/REHYDRATE"]
          : [],
      },
    }),
});

export const persistor = USE_PERSISTENCE ? persistStore(store) : null;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
