import React, { Component, useRef } from "react";
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
import { registerUser } from "../redux/features/user/userSlice";
import { useState } from "react";
import styles from "../styles/styles";
import logo from "../assets/images/logo.png";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register({ navigation }) {
  const [authData, setAuthData] = useState({});

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const headerHeight = useHeaderHeight();

  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Image style={styles.registerImage} source={logo} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            returnKeyType="next"
            autoCapitalize="words"
            onSubmitEditing={() => ref_input2.current.focus()}
            textAlign="center"
            autoComplete="name"
            onChangeText={(text) =>
              setAuthData({
                ...authData,
                firstName: text,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            autoCapitalize="words"
            onSubmitEditing={() => ref_input3.current.focus()}
            ref={ref_input2}
            returnKeyType="next"
            textAlign="center"
            autoComplete="name"
            onChangeText={(text) =>
              setAuthData({
                ...authData,
                lastName: text,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoCapitalize="none"
            onSubmitEditing={() => ref_input4.current.focus()}
            ref={ref_input3}
            returnKeyType="next"
            textAlign="center"
            keyboardType="email-address"
            autoComplete="email"
            onChangeText={(text) =>
              setAuthData({
                ...authData,
                email: text,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onSubmitEditing={() => ref_input5.current.focus()}
            ref={ref_input4}
            textContentType="password"
            returnKeyType="next"
            textAlign="center"
            secureTextEntry={true}
            onChangeText={(text) =>
              setAuthData({ ...authData, password1: text })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Confirm Password"
            textContentType="password"
            ref={ref_input5}
            textAlign="center"
            secureTextEntry={true}
            onChangeText={(text) =>
              setAuthData({ ...authData, password2: text })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            dispatch(registerUser(authData));
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
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
