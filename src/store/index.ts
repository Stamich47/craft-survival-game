import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import playerReducer from "./playerSlice";
import inventoryReducer from "./inventorySlice";
import craftingReducer from "./craftingSlice";

const persistConfig = {
  key: "root",
  version: 1, // Increment this to force a fresh start after schema changes
  storage: AsyncStorage,
  whitelist: ["player", "inventory", "crafting"], // Persist all reducers, but clear active crafting on load
};

const rootReducer = combineReducers({
  player: playerReducer,
  inventory: inventoryReducer,
  crafting: craftingReducer,
});

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
