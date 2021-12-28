import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import AppNavigator from "./appNavigator";
import { selectIsLoggedIn } from "../redux/features/user/userSlice";
import { useSelector } from "react-redux";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";

const prefix = Linking.createURL("/");

const AppRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home",
        Settings: "Settings",
        Courses: "Courses",
      },
    },
  };

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
