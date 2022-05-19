import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text } from "react-native";

import { verifyPhone } from "../redux/features/user/userSlice";
import { selectToken } from "../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUserInfo } from "../redux/features/user/userSlice";

const VerifyNumber = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [invalidCode, setInvalidCode] = useState(false);
  const [authData, setAuthData] = useState(null);
  const token = useSelector(selectToken);

  useEffect(async () => {
    if (authData !== null) {
      await dispatch(verifyPhone(authData)).then(unwrapResult);
      dispatch(getUserInfo(token));
    }
  }, [authData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter the code we sent you</Text>
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          setAuthData({ token: token, code: code });
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default VerifyNumber;
