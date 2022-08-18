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
        props.handleOpenPress();
      }}
    >
      <View style={{ height: "100%", width: "100%" }}>
        <Formik
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{ name: "", subject: "", color: "" }}
          onSubmit={(values) => {
            props.onSubmit(values);
            props.handleClosePress();
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
                <CustomText text="Add Course" font="bold" size="xl" />
              </View>
              <ModernTextInput
                label="Course Name"
                onPressIn={() => setTimeout(() => setFieldTouched("name", true), 2000)}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name && `${errors.name}`}
                borderColor={touched.name && handleBorderColor(values.name, errors.name)}
                bottomSheet
              />
              <ModernTextInput
                selector
                bottomSheet
                label="Course Subject"
                placeholder={{ label: "", value: "" }}
                items={subjects}
                onPressIn={() => setTimeout(() => setFieldTouched("subject", true), 2000)}
                onChangeText={handleChange("subject")}
                onBlur={handleBlur("subject")}
                value={values.subject}
                error={touched.subject && errors.subject && `${errors.subject}`}
                borderColor={
                  touched.subject && handleBorderColor(values.subject, errors.subject)
                }
                Icon={() => {
                  return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
                }}
              />

              <View
                style={{
                  width: BaseAppDimensions.screenWidth / 1.1,
                  alignSelf: "center",
                }}
              >
                <CustomText text="Course Color" size="s" color="grey" />
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
                  <CustomText text={errors.color} error />
                )}
              </View>
              <CustomButton
                onPress={() => handleSubmit(values)}
                title="Add"
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

export default AddCourseForm;
