import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import playerReducer from "./playerSlice";
import inventoryReducer from "./inventorySlice";
import craftingReducer from "./craftingSlice";
import uiReducer from "./uiSlice";
import worldReducer from "./worldSlice";

const persistConfig = {
  key: "root",
  version: 5, // Increment this to force a fresh start after schema changes
  storage: AsyncStorage,
  whitelist: ["player", "inventory", "crafting", "world"], // UI state should not be persisted
  debug: __DEV__, // Add debug logging in development
};

const rootReducer = combineReducers({
  player: playerReducer,
  inventory: inventoryReducer,
  crafting: craftingReducer,
  ui: uiReducer,
  world: worldReducer,
});

// Enable persistence to save player progress between sessions
const USE_PERSISTENCE = true; // Set to false to disable persistence for testing

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
