import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image } from "react-native";
import { AuthContext } from "./context";

const LogInPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputHanlder = (inputText) => {
    setEmail(inputText);
  };

  const passwordInputHanlder = (inputText) => {
    setPassword(inputText);
  };

  const { SignIn } = useContext(AuthContext);

  const loginHandle = (email, password) => {
    SignIn(email, password);
  };

  return (
    <View>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={emailInputHanlder}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={passwordInputHanlder}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.buttonSpacing}>
        <Button
          title="Log In"
          onPress={() => {
            loginHandle(email, password);
          }}
        />
        <View style={styles.buttonSpacing}>
          <Button
            color="red"
            title="Sign Up"
            onPress={() => props.setLoginPage(false)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonSpacing: {
    marginTop: 20,
  },
});

export default LogInPage;
