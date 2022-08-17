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
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import AddCourseForm from "./AddCourseForm";
import TouchableIcon from "../base/TouchableIcon";

const CreateCourseModal = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onSubmit = (courseData) => {
    dispatch(createUserCourse(courseData));
    props.onCreateModalBack();
  };

  return (
    <Modal animationType="slide" visible={props.modalVisible} transparent={false}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 40,
              alignItems: "center",
            }}
          >
            <View style={{ paddingLeft: 20 }}>
              <TouchableIcon
                name="arrow-back-outline"
                type="ionicon"
                onPress={props.onCreateModalBack}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                  fontFamily: AppFonts.SFBOLD,
                }}
              >
                Add Course
              </Text>
            </View>
            <View style={{ paddingRight: 20 }}>
              <TouchableIcon name="arrow-back-outline" type="ionicon" color="white" />
            </View>
          </View>
          <AddCourseForm onSubmit={onSubmit} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateCourseModal;
