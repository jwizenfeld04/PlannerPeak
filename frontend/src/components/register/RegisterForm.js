import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import RegisterFormStyles from "../../styles/RegisterFormStyles";
import styles from "../../styles/styles";

export default function RegisterForm(props) {
  return (
    <View style={RegisterFormStyles.entireForm}>
      <Formik
        initialValues={{
          phone: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values) => {
          props.onPress(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={RegisterFormStyles.input}
              placeholder="Phone Number"
              placeholderTextColor='grey'
              e
              textAlign="center"
              keyboardType="phone-pad"
              onChangeText={props.handleChange("phone")}
              value={props.values.phone}
            />

            <TextInput
              style={RegisterFormStyles.input}
              placeholder="Email"
              placeholderTextColor='grey'
              textAlign="center"
              keyboardType="email-address"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              style={RegisterFormStyles.input}
              placeholder="Password"
              placeholderTextColor='grey'
              textAlign="center"
              secureTextEntry={true}
              onChangeText={props.handleChange("password1")}
              value={props.values.password1}
            />
            <TextInput
              style={RegisterFormStyles.input}
              placeholder="Confirm Password"
              placeholderTextColor='grey'
              textAlign="center"
              secureTextEntry={true}
              onChangeText={props.handleChange("password2")}
              value={props.values.password2}
            />
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={props.handleSubmit}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
