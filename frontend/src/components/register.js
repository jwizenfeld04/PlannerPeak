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
import { registerUser } from "../redux/features/user/userSlice";
import { useState } from "react";

export default function Register() {
  const [authData, setAuthData] = useState({});

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>First Name: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        onChangeText={(text) =>
          setAuthData({
            ...authData,
            firstName: text,
          })
        }
      />
      <Text>Last Name: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        onChangeText={(text) =>
          setAuthData({
            ...authData,
            lastName: text,
          })
        }
      />
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
        onChangeText={(text) => setAuthData({ ...authData, password1: text })}
      />
      <Text>Confirm Password: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        onChangeText={(text) => setAuthData({ ...authData, password2: text })}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          dispatch(registerUser(authData));
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
