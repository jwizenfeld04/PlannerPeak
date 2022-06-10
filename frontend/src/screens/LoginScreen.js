import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import {
  selectError,
  selectIsPhoneVerified,
  selectToken,
} from "../redux/features/user/userSlice";
import styles from "../styles/styles";
import { AppColors, AppImages } from "../styles/globalStyles";

export default function LoginScreen({ navigation }) {
  const [authData, setAuthData] = useState({}); // Object that must include email and password sent in Login API Request
  const error = useSelector(selectError); // TODO: Fix error messages from invalid Login API Request

  const ref_input2 = useRef();

  const dispatch = useDispatch();

  const loggedInBeforeVerify = useSelector(selectToken);
  const isPhoneVerified = useSelector(selectIsPhoneVerified);

  //Not Verify but yes User account
  useEffect(() => {
    if ( !isPhoneVerified && loggedInBeforeVerify) {
      navigation.navigate("Verify");
    }
  }, [loggedInBeforeVerify]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image style={styles.loginImage} source={AppImages.plannerPeakIcon} />
        {/* ALL TEXT INPUTS SENT IN API REQUEST TO LOGIN*/}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => ref_input2.current.focus()}
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
            textAlign="center"
            ref={ref_input2}
            autoComplete="password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setAuthData({ ...authData, password: text })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            dispatch(loginUser(authData));
          }}
        >
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ paddingTop: 10, color: "blue" }}>Sign Up?</Text>
        </TouchableOpacity>
        <Button title="Forgot Password?" onPress={() => {}} />

        {/* <Text style={styles.errorText}>{error.errorMessage}</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
