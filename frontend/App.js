import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./src/redux/store";
import AppRoute from "./src/navigation/rootNavigator";
import fetchFonts from "./src/hooks/fetchFonts";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  let persistor = persistStore(store);
  const [isFontsReady, setIsFontsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();
      // Do what you need before the splash screen gets hidden
      fetchFonts();
      // Then tell the application to render
      setIsFontsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isFontsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [isFontsReady]);

  if (!isFontsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onLayoutRootView}
      >
        <AppRoute />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}
