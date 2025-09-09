import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, Text } from "react-native";
import { store, persistor } from "./src/store";
import { GameScreen } from "./src/screens";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1a1a1a",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Loading Game...</Text>
          </View>
        }
        persistor={persistor}
      >
        <StatusBar style="light" />
        <GameScreen />
      </PersistGate>
    </Provider>
  );
}
