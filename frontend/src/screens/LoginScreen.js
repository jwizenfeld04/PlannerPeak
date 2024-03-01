import React, { useEffect, useState, Fragment } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  forgotPassword,
  selectIsVerified,
  selectToken,
  selectError,
  clearLoginError,
} from "../redux/features/user/userSlice";
import { AppColors, AppImages } from "../styles/globalStyles";
import LoginForm from "../components/register/LoginForm";
import { StackActions } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const loggedInBeforeVerify = useSelector(selectToken);
  const isVerified = useSelector(selectIsVerified);
  const loginError = useSelector(selectError);

  const clearError = () => {
    dispatch(clearLoginError());
  };

  //Not Verify but yes User account
  useEffect(() => {
    if (!isVerified && loggedInBeforeVerify) {
      navigation.navigate("Verify");
    }
  }, [loggedInBeforeVerify]);

  const onPress = (values) => {
    dispatch(loginUser(values));
  };

  const onForgotPasswordPress = () => {
    navigation.navigate("Forgot Password");
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Image
            source={AppImages.plannerPeakIcon}
            style={{ flex: 1, width: 200, height: 200 }}
          />
          <LoginForm
            onPress={onPress}
            loginError={loginError}
            clearError={clearError}
            onForgotPasswordPress={onForgotPasswordPress}
            signUpPress={() => {
              navigation.dispatch(StackActions.replace("Register"));
            }}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}
