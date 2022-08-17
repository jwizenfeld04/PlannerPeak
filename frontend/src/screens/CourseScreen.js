import React, { useState, useEffect, Fragment } from "react";
import {
  SafeAreaView,
  Text,
  ActionSheetIOS,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { selectIsSchoologyAuthenticated } from "../redux/features/user/userSlice";
import {
  selectCourses,
  deleteUserCourse,
  getUserCourses,
  updateUserCoursePrefrences,
  updateSortMethod,
  selectCourseSortMethod,
} from "../redux/features/course/courseSlice";
import {
  getCourseSpecificAssignments,
  selectCourseSpecficAssignments,
} from "../redux/features/assignment/assignmentSlice";
import { getSchoologyAssignments } from "../redux/features/schoology/schoologySlice";

import Header from "../components/base/Header";
import SaveButton from "../components/base/SaveButton";
import CourseFlatList from "../components/courses/CourseFlatList";
import CreateCourseModal from "../components/courses/CreateCourseModal";
import CourseModal from "../components/courses/CourseModal";
import DeleteModeFlatList from "../components/courses/DeleteModeFlatlist";
import { getCourses } from "../components/api/getCourses";

import { AppColors, AppFonts } from "../styles/globalStyles";
import TouchableIcon from "../components/base/TouchableIcon";
import CourseHeader from "../components/courses/CourseHeader";

export default function CourseScreen() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const courseSpecficAssignments = useSelector(selectCourseSpecficAssignments);
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const getAllCourses = getCourses(dispatch);
  const sort = useSelector(selectCourseSortMethod);
  const [editPriority, setEditPriority] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleOnCoursePress = (item) => {
    setModalData({
      id: item.id,
      name: item.name,
      grade: item.grade,
      color: item.color,
      avgAssignmentMinutes: item.avg_assignment_minutes,
    });
    setModalVisible(true);
  };

  const onModalDismiss = () => {
    setModalData({});
    setModalVisible(false);
    dispatch(getUserCourses());
  };

  const onModalColorChange = (checkedColor) => {
    dispatch(
      updateUserCoursePrefrences({
        id: modalData.id,
        color: checkedColor,
      })
    );
    setModalData((prevState) => ({
      ...prevState,
      color: checkedColor,
    }));
  };

  // Retrieves all courses any time the tab renders or user signs in with Schoology
  useEffect(() => {
    if (createModalVisible === false) {
      getAllCourses(isSchoologyAuthenticated);
    }
  }, [isSchoologyAuthenticated, createModalVisible]);

  useEffect(() => {
    if (Object.keys(modalData).length !== 0) {
      dispatch(getCourseSpecificAssignments(modalData));
    }
  }, [modalData]);

  // Retreives all courses on pull-down refresh; this function is passed into the flatlist
  const onRefresh = () => {
    setIsRefreshing(true); // Must set to true to initate refresh
    getAllCourses(isSchoologyAuthenticated);
    dispatch(getSchoologyAssignments());
    setIsRefreshing(false); // Must set to false to end refresh
  };

  const onActionSheetPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Sort Courses", "Edit Course Priority", "Delete Courses", "Cancel"],
        title: "Courses",
        cancelButtonIndex: 3,
        userInterfaceStyle: "light",
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onSortPress();
        } else if (buttonIndex === 1) {
          setEditPriority(true);
        } else if (buttonIndex === 2) {
          setDeleteMode(true);
        } else if (buttonIndex === 2) {
          // cancel action
        }
      }
    );
  };
  const onSortPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Priority", "Grade", "Assignments", "Cancel"],
        title: "Sort By...",
        cancelButtonIndex: 3,
        userInterfaceStyle: "light",
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          dispatch(updateSortMethod("priority"));
        } else if (buttonIndex === 1) {
          dispatch(updateSortMethod("grade"));
        } else if (buttonIndex === 2) {
          dispatch(updateSortMethod("number_of_assignments"));
        } else if (buttonIndex === 3) {
          // cancel action
        }
      }
    );
  };

  const handleHeaderTitle = () => {
    if (deleteMode) {
      return "Delete Mode";
    } else if (editPriority) {
      return "Edit Priority";
    } else {
      return "Courses";
    }
  };

  const onDeletePress = (selected) => {
    const ids = selected;
    Alert.alert("Delete Courses", `Press "Confirm" to delete selected courses`, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          handleDelete(ids);
        },
      },
    ]);
  };

  const handleDelete = (ids) => {
    ids.forEach(function (id) {
      dispatch(deleteUserCourse({ id: id }));
    });
    setDeleteMode(false);
  };

  const handleFlatListDisplay = () => {
    if (deleteMode) {
      return (
        <DeleteModeFlatList
          courses={courses}
          onCoursePress={handleOnCoursePress}
          sort={sort}
          modalData={modalData}
          onDeletePress={onDeletePress}
          onCancelPress={() => setDeleteMode(false)}
        />
      );
    } else {
      return (
        <CourseFlatList
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
          courses={courses}
          onCoursePress={handleOnCoursePress}
          sort={sort}
          modalData={modalData}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {!deleteMode ? (
        <CourseHeader
          setCreateModalVisible={setCreateModalVisible}
          onActionSheetPress={onActionSheetPress}
        />
      ) : null}
      {handleFlatListDisplay()}
      <CourseModal
        modalVisible={modalVisible}
        modalData={modalData}
        courseSpecficAssignments={courseSpecficAssignments}
        onModalDismiss={onModalDismiss}
        onModalColorChange={onModalColorChange}
      />
      <CreateCourseModal
        modalVisible={createModalVisible}
        onCreateModalBack={() => setCreateModalVisible(false)}
      />
    </SafeAreaView>
  );
}
