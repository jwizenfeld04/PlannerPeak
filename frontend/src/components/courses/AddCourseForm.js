import React from "react";
import { Formik } from "formik";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as yup from "yup";
import ColorPalette from "react-native-color-palette";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";

const AddCourseForm = (props) => {
  const subjects = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Language Arts", value: "Language Arts" },
    { label: "Science", value: "Science" },
    { label: "Social Studies", value: "Social Studies" },
    { label: "Arts", value: "Arts" },
    { label: "Technology", value: "Technology" },
    { label: "Health & Physical Education", value: "Health & Physical Education" },
    { label: "Professional Development", value: "Professional Development" },
    { label: "Other", value: "Other" },
  ];

  const loginValidationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, ({ max }) => `Course name must be less than ${max} characters`)
      .required("Course name is required"),
    subject: yup.string().required("Course subject is required"),
    color: yup.string().required("Course color is required"),
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

  const styles = StyleSheet.create({
    loginContainer: {
      width: "80%",
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      elevation: 10,
      backgroundColor: "#e6e6e6",
      marginTop: 50,
    },
    textInput: {
      height: 40,
      width: "100%",
      margin: 3,
      backgroundColor: "white",
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 10,
    },
    textHeader: {
      color: "black",
      width: "100%",
      textAlign: "left",
      padding: 5,
    },
    errorText: { fontSize: 10, color: "red", paddingTop: 2 },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.loginContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{ name: "", subject: "", color: "" }}
          onSubmit={(values) => props.onSubmit(values)}
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
            <>
              <Text style={styles.textHeader}>Course Name</Text>
              <TextInput
                name="name"
                placeholder="Course Name"
                placeholderTextColor={"grey"}
                onPressIn={() => setTimeout(() => setFieldTouched("name", true), 2000)}
                textAlign={"center"}
                style={{
                  ...styles.textInput,
                  borderColor: touched.name
                    ? handleBorderColor(values.name, errors.name)
                    : "grey",
                }}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                keyboardType="default"
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <Text style={styles.textHeader}>Course Subject</Text>
              <RNPickerSelect
                onValueChange={handleChange("subject")}
                onOpen={() => setTimeout(() => setFieldTouched("subject", true), 2000)}
                placeholder={{ label: "Course Subject", value: "" }}
                items={subjects}
                Icon={() => {
                  return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
                }}
                style={{
                  inputIOS: {
                    ...styles.textInput,
                    textAlign: "center",
                    borderColor: touched.subject
                      ? handleBorderColor(values.subject, errors.subject)
                      : "grey",
                  },
                  placeholder: { textAlign: "center", color: "grey" },
                  iconContainer: {
                    justifyContent: "center",
                    height: "100%",
                    paddingRight: 5,
                  },
                }}
              />
              {touched.subject && errors.subject && (
                <Text style={styles.errorText}>{errors.subject}</Text>
              )}
              <ColorPalette
                onChange={handleChange("color")}
                title="Course Color"
                titleStyles={styles.textHeader}
                paletteStyles={{
                  ...styles.textInput,
                  margin: 2,
                  height: 110,
                  borderColor:
                    values.color && handleBorderColor(values.color, errors.color),
                }}
                defaultColor={props.color}
                value={values.color}
                colors={[
                  "#C0392B",
                  "#E67E22",
                  "#F1C40F",
                  "#16A085",
                  "#2980B9",
                  "#8E44AD",
                  "#FFC0CB",
                  "#FA8072",
                  "#39FF14",
                  "#808080",
                ]}
              />
              {touched.color && errors.color && (
                <Text style={styles.errorText}>{errors.color}</Text>
              )}
              <Button
                onPress={() => handleSubmit(values)}
                title="Submit"
                disabled={!isValid || isSubmitting}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddCourseForm;
