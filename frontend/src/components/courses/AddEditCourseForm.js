import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as yup from "yup";
import CustomText from "../base/CustomText";
import ColorPalette from "react-native-color-palette";
import { Icon } from "react-native-elements";
import CustomButton from "../base/Button";
import { BaseAppDimensions } from "../../styles/globalStyles";
import ModernTextInput from "../base/ModernTextInput";

const AddEditCourseForm = (props) => {
  const subjects = [
    { label: "Mathematics", value: "Mathematics", key: "10" },
    { label: "Language Arts", value: "Language Arts", key: "2" },
    { label: "Science", value: "Science", key: "3" },
    { label: "Social Studies", value: "Social Studies", key: "4" },
    { label: "Arts", value: "Arts", key: "5" },
    { label: "Technology", value: "Technology", key: "6" },
    {
      label: "Health & Physical Education",
      value: "Health & Physical Education",
      key: "7",
    },
    { label: "Professional Development", value: "Professional Development", key: "8" },
    { label: "Other", value: "Other", key: "9" },
  ];

  const validationSchema = yup.object().shape({
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

  const formikRef = useRef();
  const resetForm = () => formikRef.current.resetForm();

  useEffect(() => {
    if (props.bottomSheetIndex === -1) {
      resetForm();
    }
  }, [props.bottomSheetIndex]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        props.handleOpen();
      }}
    >
      <View style={{ height: "100%", width: "100%" }}>
        <Formik
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{
            name: props.edit ? props.course.name : "",
            subject: props.edit ? props.course.subject : "",
            color: props.edit ? props.course.color : "",
          }}
          onSubmit={(values) => {
            props.onSubmit(values);
            props.handleClose();
          }}
          innerRef={formikRef}
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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <CustomText font="bold" size="xl">
                  {props.edit ? "Edit Course" : "Add Course"}
                </CustomText>
              </View>
              <ModernTextInput
                label="Course Name"
                onPressIn={() => setTimeout(() => setFieldTouched("name", true), 2000)}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name && `${errors.name}`}
                borderColor={touched.name && handleBorderColor(values.name, errors.name)}
                defaultValue={values.name}
                bottomSheet
                required
              />
              <ModernTextInput
                selector
                bottomSheet
                label="Course Subject"
                placeholder={{ label: values.subject, value: values.subject, key: "1" }}
                items={subjects}
                onPressIn={() => setTimeout(() => setFieldTouched("subject", true), 2000)}
                onChangeText={handleChange("subject")}
                onBlur={handleBlur("subject")}
                value={values.subject}
                error={touched.subject && errors.subject && `${errors.subject}`}
                borderColor={
                  touched.subject && handleBorderColor(values.subject, errors.subject)
                }
                required
              />

              <View
                style={{
                  width: BaseAppDimensions.screenWidth / 1.1,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <CustomText size="s" color="grey">
                  Course Color
                </CustomText>
                <CustomText size="xs" color="red">
                  {" "}
                  *
                </CustomText>
              </View>
              <View
                style={{
                  width: BaseAppDimensions.screenWidth / 1.5,
                  alignSelf: "center",
                }}
              >
                <ColorPalette
                  onChange={(e) => {
                    handleChange("color")(e);
                    setTimeout(() => setFieldTouched("color", true), 50);
                  }}
                  title=""
                  paletteStyles={{ paddingBottom: 10 }}
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
              </View>
              <View style={{ alignItems: "center", width: "100%" }}>
                {touched.color && errors.color && (
                  <CustomText error>{errors.color}</CustomText>
                )}
              </View>
              <CustomButton
                onPress={() => handleSubmit(values)}
                title={props.edit ? "Save" : "Add"}
                disabled={!isValid || isSubmitting}
                styles={{ padding: 20 }}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddEditCourseForm;
