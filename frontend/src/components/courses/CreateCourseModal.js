import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { createUserCourse } from "../../redux/features/course/courseSlice";
import styles from "./styles";
import { useDispatch } from "react-redux";
import Header from "../base/Header";
import { AppColors } from "../../styles/globalStyles";
import AddCourseForm from "./AddCourseForm";

const CreateCourseModal = (props) => {
  const dispatch = useDispatch();


  useEffect(() => {}, []);

  const onSubmit = (courseData) => {
    dispatch(createUserCourse(courseData));
    props.onCreateModalBack();
  };

  return (
    <Modal animationType="slide" visible={props.modalVisible} transparent={false}>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }}
      />
      <SafeAreaView style={{ alignItems: "center" }}>
        <Header
          title={"Add Course"}
          backButton={true}
          onBackButtonPress={props.onCreateModalBack}
          iconColor={AppColors.primaryAccentColor}
        />
        <AddCourseForm onSubmit={onSubmit}/>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateCourseModal;
