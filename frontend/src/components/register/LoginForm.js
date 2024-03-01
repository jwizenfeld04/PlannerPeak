import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomTextInput from "../base/textInput/TextInput";
import CustomButton from "../base/Button";
import ModernTextInput from "../base/ModernTextInput";
import { Button, Text, KeyboardAvoidingView } from "react-native";
import CustomText from "../base/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppImages } from "../../styles/globalStyles";
import { SocialIcon } from "react-native-elements";

export default function LoginForm(props) {
  const registerValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
  });

  const handleBorderColor = (value, error) => {
    if (value && !error && !props.loginError) {
      return "lightgreen";
    } else if (error || props.loginError) {
      return "red";
    } else {
      return "grey";
    }
  };
  return (
    <Formik
      validationSchema={registerValidationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        props.onPress(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
        isSubmitting,
        setFieldTouched,
        setErrors,
      }) => (
        <View style={{ flex: 3 }}>
          <View style={{ marginTop: 40 }}>
            <ModernTextInput
              label="Email"
              onPressIn={() => setTimeout(() => setFieldTouched("email", true), 2000)}
              onChangeText={(e) => {
                handleChange("email")(e);
                props.clearError();
              }}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              value={values.email}
              error={touched.email && errors.email && `${errors.email}`}
              borderColor={touched.email && handleBorderColor(values.email, errors.email)}
            />
            <ModernTextInput
              label="Password"
              onPressIn={() => setTimeout(() => setFieldTouched("password", true), 2000)}
              onChangeText={(e) => {
                handleChange("password")(e);
                props.clearError();
              }}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && errors.password && `${errors.password}`}
              borderColor={
                touched.password && handleBorderColor(values.password, errors.password)
              }
              secureTextEntry
            />
          </View>
          <View style={{ marginTop: 10, flex: 1 }}>
            {props.loginError ? (
              <Text
                style={{ margin: 8, color: "red", fontSize: 12, textAlign: "center" }}
              >
                Invalid Login Credentials
              </Text>
            ) : null}
            <CustomButton onPress={handleSubmit} title="Login" width="100%" />

            <View style={{ alignSelf: "center", flex: 1, marginTop: 5 }}>
              <TouchableOpacity onPress={props.onForgotPasswordPress} y>
                <CustomText style={{ padding: 5, textAlign: "center", color: "navy" }}>
                  Forgot Password?
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
              <TouchableOpacity></TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 150,
                }}
              >
                <CustomText style={{ color: "grey" }}>Don't have an account?</CustomText>
                <TouchableOpacity onPress={props.signUpPress}>
                  <CustomText style={{ padding: 5, textAlign: "center", color: "navy" }}>
                    Sign Up
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
