import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as yup from "yup";
import CustomText from "../base/CustomText";
import { Icon } from "react-native-elements";
import CustomButton from "../base/Button";
import { BaseAppDimensions } from "../../styles/globalStyles";
import ModernTextInput from "../base/ModernTextInput";

const AddTaskForm = (props) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, ({ max }) => `Course name must be less than ${max} characters`)
      .required("Course name is required"),
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
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            console.log(values);
            Keyboard.dismiss();
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
                  Add Task
                </CustomText>
              </View>
              <ModernTextInput
                label="Name"
                onPressIn={() => setTimeout(() => setFieldTouched("name", true), 2000)}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name && `${errors.name}`}
                borderColor={touched.name && handleBorderColor(values.name, errors.name)}
                bottomSheet
                required
              />
              <CustomButton
                onPress={() => handleSubmit(values)}
                title="Add"
                disabled={!isValid || isSubmitting}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTaskForm;
