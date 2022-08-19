import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as yup from "yup";
import CustomText from "../base/CustomText";
import { Icon } from "react-native-elements";
import CustomButton from "../base/Button";
import { BaseAppDimensions } from "../../styles/globalStyles";
import ModernTextInput from "../base/ModernTextInput";

const AddAssignmentForm = (props) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, ({ max }) => `Course name must be less than ${max} characters`)
      .required("Course name is required"),
    course: yup.string().required("Course is required"),
    dueDate: yup.string().required("Due date is required"),
    time: yup.string().required("Estimated time is required"),
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

  const times = [
    { label: "5 Min", value: "5" },
    { label: "15 Min", value: "15" },
    { label: "30 Min", value: "30" },
    { label: "1 Hour", value: "60" },
    { label: "1 Hour +", value: "90" },
  ];

  const formikRef = useRef();
  const resetForm = () => formikRef.current.resetForm();
  const touchedDateField = () =>
    setTimeout(() => formikRef.current.setFieldTouched("dueDate", true, true), 2000);
  const setDateField = (date) => {
    formikRef.current.setFieldValue("dueDate", date, true);
    touchedDateField();
  };

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
          initialValues={{ name: "", course: "", description: "", dueDate: "", time: "" }}
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
                  Add Assignment
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
              <ModernTextInput
                selector
                required
                bottomSheet
                label="Course"
                placeholder={{ label: "", value: "" }}
                items={props.courses}
                onPressIn={() => setTimeout(() => setFieldTouched("course", true), 2000)}
                onChangeText={handleChange("course")}
                onBlur={handleBlur("course")}
                value={values.course}
                error={touched.course && errors.course && `${errors.course}`}
                borderColor={
                  touched.course && handleBorderColor(values.course, errors.course)
                }
                Icon={() => {
                  return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
                }}
              />

              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <ModernTextInput
                  width={BaseAppDimensions.screenWidth / 2.5}
                  label="Due Date"
                  required
                  date
                  onPressIn={() =>
                    setTimeout(() => setFieldTouched("dueDate", true), 2000)
                  }
                  onChangeText={handleChange("dueDate")}
                  setDateField={setDateField}
                  touchedDateField={touchedDateField}
                  onBlur={handleBlur("dueDate")}
                  value={values.dueDate}
                  error={touched.dueDate && errors.dueDate && `${errors.dueDate}`}
                  borderColor={
                    touched.dueDate && handleBorderColor(values.dueDate, errors.dueDate)
                  }
                />
                <ModernTextInput
                  width={BaseAppDimensions.screenWidth / 2.2}
                  label="Estimated Time"
                  selector
                  required
                  placeholder={{ label: "", value: "" }}
                  items={times}
                  bottomSheet
                  onPressIn={() => setTimeout(() => setFieldTouched("time", true), 2000)}
                  onChangeText={handleChange("time")}
                  onBlur={handleBlur("time")}
                  value={values.time}
                  error={touched.time && errors.time && `${errors.time}`}
                  borderColor={
                    touched.time && handleBorderColor(values.time, errors.time)
                  }
                />
              </View>
              <ModernTextInput
                label="Description"
                onPressIn={() =>
                  setTimeout(() => setFieldTouched("description", true), 2000)
                }
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                error={
                  touched.description && errors.description && `${errors.description}`
                }
                borderColor={
                  touched.description &&
                  handleBorderColor(values.description, errors.description)
                }
                bottomSheet
              />
              <CustomButton
                onPress={() => handleSubmit(values)}
                title="Add"
                disabled={isSubmitting}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddAssignmentForm;
