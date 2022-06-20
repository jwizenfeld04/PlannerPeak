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
import { AppImages, AppColors } from "../styles/globalStyles";
import { unwrapResult } from "@reduxjs/toolkit";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const loggedInBeforeVerify = useSelector(selectToken);
  const isPhoneVerified = useSelector(selectIsPhoneVerified);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  registerImage: {
    marginTop: 50,
    marginBottom: 20,
  },
  loginImage: {
    marginTop: 50,
    marginBottom: 100,    
  },
  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 12,
    marginTop: 12,
  },
  textInput: {
    height: 50,
    width: "70%",
    flex: 1,
    padding: 10,
    marginLeft: 40,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4169e1",
  },
  errorText: {
    color: "red",
  },
});
