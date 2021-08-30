import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image } from "react-native";
import { AuthContext } from "./context";

const SignUpPage = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const { SignUp } = useContext(AuthContext);

  const emailInputHanlder = (inputText) => {
    setEmail(inputText);
  };

  const firstNameInputHanlder = (inputText) => {
    setFirstName(inputText);
  };

  const lastNameInputHanlder = (inputText) => {
    setLastName(inputText);
  };

  const passwordInputHanlder = (inputText) => {
    setPassword(inputText);
  };

  const passwordConfirmInputHanlder = (inputText) => {
    setConfirmPassword(inputText);
  };

  const signupHandle = (email, first_name, last_name, password1, password2) => {
    SignUp(email, first_name, last_name, password1, password2);
  };

  return (
    <View>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={emailInputHanlder}
        />
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={firstNameInputHanlder}
        />
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={lastNameInputHanlder}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={passwordInputHanlder}
        />
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={passwordConfirmInputHanlder}
        />
      </View>
      <View style={styles.buttonSpacing}>
        <Button
          title="Sign Up"
          onPress={() => {
            signupHandle(email, firstName, lastName, password, passwordConfirm);
          }}
        />
        <View style={styles.buttonSpacing}>
          <Button
            color="red"
            title="Log in"
            onPress={() => props.setLoginPage(true)}
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

export default SignUpPage;
