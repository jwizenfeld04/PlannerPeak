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
import CustomTextInput from "../base/textInput/TextInput";
import CustomButton from "../base/Button";
import { AppColors } from "../../styles/globalStyles";
import styles from "../base/textInput/styles";

const AddCourseForm = (props) => {
  const subjects = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Language Arts", value: "Language Arts" },
    { label: "Science", value: "Science" },
    { label: "Social Studies", value: "Social Studies" },
    { label: "Arts", value: "Arts" },
    { label: "Technology", value: "Technology" },
    {
      label: "Health & Physical Education",
      value: "Health & Physical Education",
    },
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



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{height:'100%', width:'100%'}}>
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
              <CustomTextInput
                placeholder="Course Name" 
                onPressIn={() =>
                  setTimeout(() => setFieldTouched("name", true), 2000)
                }
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name && `${errors.name}`}
              />
              <View style={styles.fullTextInputContainer}>
                <View style={styles.textInputLabelContainer}>
                </View>
                <View style={styles.textInputContainer}>
              <RNPickerSelect
                onValueChange={handleChange("subject")}
                onOpen={() =>
                  setTimeout(() => setFieldTouched("subject", true), 2000)
                }
                placeholder={{ label: "Course Subject", value: "" }}
                items={subjects}
                // Icon={() => {
                //   return (
                //     <Icon
                //       name="chevron-down-outline"
                //       type="ionicon"
                //       color="grey"
                //     />
                //   );
                // }}
                style={{
                  viewContainer: {backgroundColor: "orange", justifyContent: "center", paddingLeft:10,},
                  inputIOSContainer: {backgroundColor:'blue', width:'100%', flex:1,},
                  placeholder: { color: AppColors.primaryBackgroundColor, },
                  iconContainer: {justifyContent:'flex-end', alignItems:'flex-end', backgroundColor:'yellow', position:'relative'}
                }}
              />
         </View>
              <View style={{flex:3, alignItems: "center", width:'100%',}}>
              {touched.subject && errors.subject && (
                <Text style={styles.errorText}>{errors.subject}</Text>
                )}
                </View>
                </View>
              <ColorPalette
                onChange={handleChange("color")}
                title="Course Color"
                titleStyles={styles.textHeader}
                paletteStyles={{
                  ...styles.textInput,
                  margin: 2,
                  height: 110,
                  borderColor:
                    values.color &&
                    handleBorderColor(values.color, errors.color),
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
              <CustomButton
                onPress={() => handleSubmit(values)}
                title="Submit"
                width='30%'
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
