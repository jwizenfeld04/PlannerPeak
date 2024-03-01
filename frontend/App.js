import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./src/redux/store";
import AppRoute from "./src/navigation/rootNavigator";
import fetchFonts from "./src/hooks/fetchFonts";
import fetchImages from "./src/hooks/fetchImages";
import * as SplashScreen from "expo-splash-screen";
import { AppImages } from "./src/styles/globalStyles";
import { injectStore } from "./src/api/config";

export default function App() {
  let persistor = persistStore(store);
  const [isReady, setIsReady] = useState(false);
  injectStore(store);

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();
      // AppImages is an object with key/value pairs for images in assets folder
      const imageAssets = fetchImages(AppImages);
      const fontAssets = fetchFonts();
      await Promise.all([imageAssets, fontAssets]);
      // Then tell the application to render
      setIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
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
