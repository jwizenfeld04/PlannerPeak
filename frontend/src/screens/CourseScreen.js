import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectIsSchoologyAuthenticated,
} from "../redux/features/user/userSlice";
import {
  selectCourses,
  updateUserCoursePrefrences,
} from "../redux/features/course/courseSlice";
import {
  getCourseSpecificAssignments,
  selectCourseSpecficAssignments,
} from "../redux/features/assignment/assignmentSlice";
import courseScreenStyles from "../styles/courseScreenStyles";
import { getCourses } from "../components/api/getCourses";
import { getAssignments } from "../components/api/getAssignments";
import CourseFlatList from "../components/courses/CourseFlatList";
import CourseModal from "../components/courses/CourseModal";
import Header from "../components/courses/Header";
import CreateCourseModal from "../components/courses/CreateCourseModal";

export default function CourseScreen() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Gets string of user token from DB
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const courseSpecficAssignments = useSelector(selectCourseSpecficAssignments);
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const getAllCourses = getCourses(dispatch);
  const getAllAssignments = getAssignments(dispatch);

  const handleOnCoursePress = (item) => {
    setModalData({
      id: item.id,
      token: token,
      name: item.name,
      grade: item.grade,
      color: item.color,
      priority: item.priority,
      notifications: item.notifications,
    });
    setModalVisible(true);
  };

  const onCheckmarkPress = () => {
    setCourseNotifications(!courseNotifications);
    setModalData((prevState) => ({
      ...prevState,
      notifications: !courseNotifications,
    }));
  };

  const onPriorityPress = (number) => {
    setModalData((prevState) => ({
      ...prevState,
      priority: number,
    }));
  };

  const onRadioPress = (checkedColor) => {
    setModalData((prevState) => ({
      ...prevState,
      color: checkedColor,
    }));
  };

  const onModalDismiss = () => {
    dispatch(updateUserCoursePrefrences(modalData));
    getAllCourses(token, isSchoologyAuthenticated);
  };

  const onModalBack = () => {
    setModalVisible(false);
  };

  const onCreateModalBack = () => {
    setCreateModalVisible(false);
  };
  const onCreateModalPress = () => {
    setCreateModalVisible(true);
  };


  // Retrieves all courses any time the tab renders or user signs in with Schoology
  useEffect(() => {
    getAllCourses(token, isSchoologyAuthenticated);
  }, [isSchoologyAuthenticated]);

  useEffect(() => {
    dispatch(getCourseSpecificAssignments(modalData));
  }, [modalData]);

  // Retreives all courses on pull-down refresh; this function is passed into the flatlist
  const onRefresh = () => {
    setIsRefreshing(true); // Must set to true to initate refresh
    getAllCourses(token, isSchoologyAuthenticated);
    getAllAssignments(token, isSchoologyAuthenticated);
    setIsRefreshing(false); // Must set to false to end refresh
  };

  return (
    <SafeAreaView style={courseScreenStyles.container}>
      <Header onCreateModalPress={onCreateModalPress}/>
      <CourseFlatList
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        courses={courses}
        onCoursePress={handleOnCoursePress}
        modalData={modalData}
      />
      <CourseModal
        modalVisible={modalVisible}
        modalData={modalData}
        courseSpecficAssignments={courseSpecficAssignments}
        onRadioPress={onRadioPress}
        onPriorityPress={onPriorityPress}
        onCheckmarkPress={onCheckmarkPress}
        onModalDismiss={onModalDismiss}
        onModalBack={onModalBack}
      />
      <CreateCourseModal
        modalVisible={createModalVisible}
        onCreateModalBack={onCreateModalBack}
      />
    </SafeAreaView>
  );
}
