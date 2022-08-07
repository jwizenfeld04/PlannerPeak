import React from "react";
import { ScrollView, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomTextInput from "../base/textInput/TextInput";
import CustomButton from "../base/Button";
import { Button, Text, KeyboardAvoidingView } from "react-native";
import { formatPhoneNumber } from "./formatPhoneNumber";
import "yup-phone";

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
          <CustomTextInput
            placeholder="Email"
            onPressIn={() => setTimeout(() => setFieldTouched("email", true), 2000)}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            value={values.email}
            error={touched.email && errors.email && `${errors.email}`}
            borderColor={touched.email && handleBorderColor(values.email, errors.email)}
            styles={{ height: "17%" }}
          />
          <CustomTextInput
            placeholder="Password"
            onPressIn={() => setTimeout(() => setFieldTouched("password1", true), 2000)}
            onChangeText={handleChange("password1")}
            onBlur={handleBlur("password1")}
            value={values.password1}
            error={touched.password1 && errors.password1 && `${errors.password1}`}
            borderColor={
              touched.password1 && handleBorderColor(values.password1, errors.password1)
            }
            styles={{ height: "17%" }}
            password
          />
          <CustomTextInput
            placeholder="Confirm Password"
            onPressIn={() => setTimeout(() => setFieldTouched("password2", true), 2000)}
            onChangeText={handleChange("password2")}
            onBlur={handleBlur("password2")}
            value={values.password2}
            error={touched.password2 && errors.password2 && `${errors.password2}`}
            styles={{ height: "17%" }}
            borderColor={
              touched.password2 && handleBorderColor(values.password2, errors.password2)
            }
            password
          />
          <View>
            <CustomButton onPress={handleSubmit} title="Sign Up" width="50%" />
            <View style={{ alignSelf: "center", width: "25%" }}>
              <Button title="Login?" onPress={props.loginPress} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
