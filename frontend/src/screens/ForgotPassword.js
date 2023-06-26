import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import TouchableIcon from "../components/base/TouchableIcon";
import { requestForgotPassword } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const ForgotPasswordScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState({});
  const [emailStatus, setEmailStatus] = useState(null);
  const dispatch = useDispatch();

  const handleEmailSent = async () => {
    try {
      await dispatch(requestForgotPassword(email)).then(unwrapResult);
      setEmail("");
      setEmailStatus(true);
    } catch {
      Alert.alert("Invalid Email Address");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
        <View style={{ alignItems: "flex-start" }}>
          <TouchableIcon
            name={"chevron-back-sharp"}
            type={"ionicon"}
            onPress={() => navigation.navigate("Login")}
            color={"black"}
            size={40}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Text>Enter Email To Reset Password</Text>
          <View
            style={{
              width: "80%",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              elevation: 10,
              backgroundColor: "#e6e6e6",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"grey"}
              textAlign={"center"}
              onChangeText={(value) => setEmail({ email: value })}
              keyboardType="email-address"
            />
          </View>
          <Button title="Send Reset Password Email" onPress={handleEmailSent} />
          {emailStatus ? <Text>Email Sent!</Text> : null}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
