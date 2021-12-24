import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import AppNavigator from "./appNavigator";
import { selectIsLoggedIn } from "../redux/features/user/userSlice";
import { useSelector } from "react-redux";

const AppRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
