import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import AppNavigator from "./appNavigator";
import {
  selectIsPhoneVerified,
} from "../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { verifySchoology } from "../redux/features/schoology/schoologySlice";
import { selectToken, getUserInfo, selectIsSchoologyAuthenticated } from "../redux/features/user/userSlice";
import {
  selectUrl,
  selectIsAuthorized,
} from "../redux/features/schoology/schoologySlice";

const prefix = Linking.createURL("/");

const AppRoute = () => {
  const dispatch = useDispatch();
  const isPhoneVerified = useSelector(selectIsPhoneVerified);
  const token = useSelector(selectToken);
  const isAuthorized = useSelector(selectIsAuthorized);
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated);

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
        dispatch(verifySchoology(token))
      }, 1500);
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (data) => handleDeepLink(data));
    return () => {
      subscription.remove();
    };
  }, [isAuthorized]);


  return (
    <NavigationContainer linking={linking}>
      {token && isPhoneVerified ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
