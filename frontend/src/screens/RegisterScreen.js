import React, { Component, useRef, useState } from "react";
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
import styles from "../styles/styles";
import { AppImages, AppColors } from "../styles/globalStyles";

export default function RegisterScreen({ navigation }) {
  // Object that must include first name, last name, email, password, and confirm password sent in Register API Request
  const [authData, setAuthData] = useState({});

  // Ref used to auto switch to next text input when pressing "return" key on keyboard
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Image style={styles.registerImage} source={AppImages.plannerPeakIcon} />
        </View>
        {/* ALL TEXT INPUTS SENT IN API REQUEST TO CREATE A NEW ACCOUNT */}
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
