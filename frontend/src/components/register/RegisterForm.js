import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomTextInput from "../base/textInput/TextInput";
import CustomButton from "../base/Button";
import { Button, Text, KeyboardAvoidingView } from "react-native";
import { formatPhoneNumber } from "./formatPhoneNumber";
import "yup-phone";
import ModernTextInput from "../base/ModernTextInput";
import CustomText from "../base/CustomText";

export default function RegisterForm(props) {
  const registerValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .required("Phone number is required")
      .phone("IN", false, "Invalid Phone Number"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password1: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?!^\d+$)^.+$$/, "Password cannot be entirely numeric"),
    password2: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password1"), null], "Confirm Password does not match"),
  });

  const handleBorderColor = (value, error) => {
    if (value && !error) {
      return "lightgreen";
    } else if (error) {
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
        phone: "",
        email: "",
        password1: "",
        password2: "",
      }}
      onSubmit={(values) => {
        //Changes phone number format to follow twilio's API
        values.phone = `+1${values.phone.replace(/\D/g, "")}`;
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
      }) => (
        <View style={{ flex: 3 }}>
          <View style={{ marginTop: 40 }}>
            <CustomTextInput
              placeholder="Phone Number"
              onPressIn={() => setTimeout(() => setFieldTouched("phone", true), 3000)}
              onChangeText={(e) => {
                formatPhoneNumber(e);
                handleChange("phone")(e);
              }}
              onBlur={handleBlur("phone")}
              keyboardType="phone-pad"
              value={formatPhoneNumber(values.phone)}
              error={touched.phone && errors.phone && `${errors.phone}`}
              borderColor={touched.phone && handleBorderColor(values.phone, errors.phone)}
              styles={{ height: "17%" }}
              phone
            />
            <ModernTextInput
              label="Email"
              onPressIn={() => setTimeout(() => setFieldTouched("email", true), 2000)}
              onChangeText={(e) => {
                handleChange("email")(e);
              }}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              value={values.email}
              error={touched.email && errors.email && `${errors.email}`}
              borderColor={touched.email && handleBorderColor(values.email, errors.email)}
            />
            <ModernTextInput
              label="Password"
              onPressIn={() => setTimeout(() => setFieldTouched("password1", true), 2000)}
              onChangeText={(e) => {
                handleChange("password1")(e);
              }}
              onBlur={handleBlur("password1")}
              value={values.password1}
              error={touched.password1 && errors.password1 && `${errors.password1}`}
              borderColor={
                touched.password1 && handleBorderColor(values.password1, errors.password1)
              }
              secureTextEntry
            />
            <ModernTextInput
              label="Confirm Password"
              onPressIn={() => setTimeout(() => setFieldTouched("password2", true), 2000)}
              onChangeText={(e) => {
                handleChange("password2")(e);
              }}
              onBlur={handleBlur("password2")}
              value={values.password2}
              error={touched.password2 && errors.password2 && `${errors.password2}`}
              borderColor={
                touched.password2 && handleBorderColor(values.password2, errors.password2)
              }
              secureTextEntry
            />
          </View>
          <View>
            <CustomButton onPress={handleSubmit} title="Sign Up" width="100%" />
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
              <CustomText style={{ color: "grey" }}>Already have an account?</CustomText>
              <TouchableOpacity onPress={props.loginPress}>
                <CustomText style={{ padding: 5, textAlign: "center", color: "navy" }}>
                  Login
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
