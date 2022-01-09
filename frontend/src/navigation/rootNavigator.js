import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import AppNavigator from "./appNavigator";
import { selectIsLoggedIn } from "../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { verifySchoology } from "../redux/features/schoology/schoologySlice";
import { selectToken } from "../redux/features/user/userSlice";
import {
  selectUrl,
  selectIsAuthorized,
} from "../redux/features/schoology/schoologySlice";

const prefix = Linking.createURL("/");

const AppRoute = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const isAuthorized = useSelector(selectIsAuthorized);

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

  const handleDeepLink = (ev) => {
    if (isAuthorized === true) {
      setTimeout(() => {
        dispatch(verifySchoology(token));
      }, 500);
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    };
  }, [isAuthorized]);

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
