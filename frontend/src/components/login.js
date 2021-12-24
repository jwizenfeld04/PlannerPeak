import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import { useState } from "react";

export default function Login() {
  const [authData, setAuthData] = useState({});

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Email: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) =>
          setAuthData({
            ...authData,
            email: text,
          })
        }
      />
      <Text>Password: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(text) => setAuthData({ ...authData, password: text })}
      />
      <Button
        title="Login"
        onPress={() => {
          dispatch(loginUser(authData));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
});
