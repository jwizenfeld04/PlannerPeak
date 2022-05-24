import React, { Component, useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Linking,
  TextInput,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  selectToken,
  selectIsPhoneVerified,
} from "../redux/features/user/userSlice";
import styles from "../styles/styles";
import { AppImages, AppColors } from "../styles/globalStyles";
import { unwrapResult } from "@reduxjs/toolkit";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const loggedInBeforeVerify = useSelector(selectToken);
  const isPhoneVerified = useSelector(selectIsPhoneVerified);

  //Not Verify but yes User account
  useEffect(() => {
    if (loggedInBeforeVerify && !isPhoneVerified) {
      navigation.navigate("Verify");
    }
  }, []);

  const onPress = async (values) => {
    console.log(values);
    await dispatch(registerUser(values)).then(unwrapResult);
    navigation.navigate("Verify");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.registerImage}
            source={AppImages.plannerPeakIcon}
          />
        </View>

        <RegisterForm onPress={onPress} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ paddingTop: 10, color: "blue" }}>Login?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
