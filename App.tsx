import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, Text } from "react-native";
import { store, persistor } from "./src/store";
import { GameScreen } from "./src/screens";

export default function App() {
  const AppContent = () => (
    <>
      <StatusBar style="light" />
      <GameScreen />
    </>
  );

  return (
    <Provider store={store}>
      {persistor ? (
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
              <Text style={{ color: "#fff", fontSize: 18 }}>
                Loading Game...
              </Text>
            </View>
          }
          persistor={persistor}
        >
          <AppContent />
        </PersistGate>
      ) : (
        <AppContent />
      )}
    </Provider>
  );
}
