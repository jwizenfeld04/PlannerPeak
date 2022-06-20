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
import styles from "./styles"

export default function RegisterForm(props) {
  return (
    <View style={styles.entireForm}>
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
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor='grey'
              e
              textAlign="center"
              keyboardType="phone-pad"
              onChangeText={props.handleChange("phone")}
              value={props.values.phone}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor='grey'
              textAlign="center"
              keyboardType="email-address"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor='grey'
              textAlign="center"
              secureTextEntry={true}
              onChangeText={props.handleChange("password1")}
              value={props.values.password1}
            />
            <TextInput
              style={styles.input}
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
