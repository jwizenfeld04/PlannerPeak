import React, { useEffect, Fragment } from "react";
import {
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  selectToken,
  selectIsVerified,
} from "../redux/features/user/userSlice";
import { AppImages, AppColors } from "../styles/globalStyles";
import { unwrapResult } from "@reduxjs/toolkit";
import RegisterForm from "../components/register/RegisterForm";
import { StackActions } from "@react-navigation/native";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const loggedInBeforeVerify = useSelector(selectToken);
  const isPhoneVerified = useSelector(selectIsVerified);

  // Not Verify but yes User account
  useEffect(() => {
    if (!isPhoneVerified && loggedInBeforeVerify) {
      navigation.navigate("Verify");
    }
  }, [loggedInBeforeVerify]);

  const onPress = async (values) => {
    await dispatch(registerUser(values)).then(unwrapResult);
    navigation.navigate("Verify");
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
          <RegisterForm
            onPress={onPress}
            loginPress={() => {
              navigation.dispatch(StackActions.replace("Login"));
            }}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}
