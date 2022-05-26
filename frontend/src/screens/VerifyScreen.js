import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text } from "react-native";

import { verifyPhone, verifyResend } from "../redux/features/user/userSlice";
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
  const [clearInput, setclearInput] = useState(false);
  const [code, setCode] = useState();

  useEffect(async () => {
    if (authData !== null) {
      try {
        await dispatch(verifyPhone(authData)).then(unwrapResult);
        dispatch(getUserInfo(token));
      } catch (error) {
        setInvalidCode(true);
        setCode("");
        setclearInput(true);
      }
    }
  }, [authData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter Verification Code</Text>
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        clearInputs={clearInput}
        onCodeChanged={(code) => {
          setCode(code);
          setclearInput(false);
        }}
        code={code}
        onCodeFilled={(code) => {
          setAuthData({ token: token, code: code });
        }}
      />
      {invalidCode && <Text style={styles.error}>Invalid Code</Text>}
      <Button
        title="Resend Code"
        onPress={() => {
          dispatch(verifyResend(token));
        }}
      />
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
    borderColor: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default VerifyNumber;
