import React from "react";
import { ScrollView, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomTextInput from "../base/textInput/TextInput";
import CustomButton from "../base/Button";
import { Button, Text, KeyboardAvoidingView } from "react-native";

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
          <CustomTextInput
            placeholder="Email"
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
            styles={{ height: "17%" }}
          />
          <CustomTextInput
            placeholder="Password"
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
            styles={{ height: "17%" }}
            password
          />
          <View>
          {props.loginError ? (
            <Text style={{ margin: 8, color: "red", fontSize: 12, textAlign: "center" }}>
              Invalid Login Credentials
            </Text>
          ) : null}
          <CustomButton onPress={handleSubmit} title="Login" width="50%" />
          <View style={{ alignSelf: "center" }}>
            <Button title="Sign Up?" onPress={props.signUpPress} />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Button title="Forgot Password?" onPress={props.onForgotPasswordPress} />
          </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
