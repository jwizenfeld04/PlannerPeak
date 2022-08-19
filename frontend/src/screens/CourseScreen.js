import React, { useState, useEffect } from "react";
import { SafeAreaView, ActionSheetIOS, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { selectIsSchoologyAuthenticated } from "../redux/features/user/userSlice";
import {
  selectCourses,
  deleteUserCourse,
  getUserCourses,
  updateUserCoursePrefrences,
  updateSortMethod,
  selectCourseSortMethod,
  createUserCourse,
} from "../redux/features/course/courseSlice";
import {
  getCourseSpecificAssignments,
  selectCourseSpecficAssignments,
} from "../redux/features/assignment/assignmentSlice";
import { getSchoologyAssignments } from "../redux/features/schoology/schoologySlice";
import CourseFlatList from "../components/courses/CourseFlatList";
import CourseModal from "../components/courses/CourseModal";
import { getCourses } from "../components/api/getCourses";

import CourseHeader from "../components/courses/CourseHeader";
import CustomBottomSheet from "../components/base/CustomBottomSheet";
import AddEditCourseForm from "../components/courses/AddEditCourseForm";

export default function CourseScreen() {
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const courseSpecficAssignments = useSelector(selectCourseSpecficAssignments);
  const sort = useSelector(selectCourseSortMethod);

  const getAllCourses = getCourses(dispatch);

  const [modalVisible, setModalVisible] = useState(false);
  const [addCourseVisible, setAddCourseVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [deleteMode, setDeleteMode] = useState(false);
  let [selected, setSelected] = useState([]); // For Delete Mode

  const handleOnCoursePress = (item) => {
    setModalData({
      id: item.id,
      name: item.name,
      subject: item.subject,
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

  useEffect(() => {
    getAllCourses(isSchoologyAuthenticated);
    if (Object.keys(modalData).length !== 0) {
      dispatch(getCourseSpecificAssignments(modalData));
    }
  }, [modalData, isSchoologyAuthenticated]);

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
        options: ["Sort Courses", "Delete Courses", "Cancel"],
        title: "Courses",
        cancelButtonIndex: 2,
        userInterfaceStyle: "light",
        destructiveButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onSortPress();
        } else if (buttonIndex === 1) {
          setDeleteMode(true);
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
          setSelected([]);
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

  const onAddCourseSubmit = (courseData) => {
    dispatch(createUserCourse(courseData));
    setAddCourseVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {!deleteMode ? (
        <CourseHeader
          setAddCourseVisible={setAddCourseVisible}
          onActionSheetPress={onActionSheetPress}
          addCourseVisible={addCourseVisible}
        />
      ) : null}
      <CourseFlatList
        delete={deleteMode}
        onDeletePress={onDeletePress}
        onCancelPress={() => {
          setSelected([]);
          setDeleteMode(false);
        }}
        selected={selected}
        setSelected={setSelected}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        courses={courses}
        onCoursePress={handleOnCoursePress}
        sort={sort}
        modalData={modalData}
      />
      <CourseModal
        modalVisible={modalVisible}
        modalData={modalData}
        setModalData={setModalData}
        courseSpecficAssignments={courseSpecficAssignments}
        onModalDismiss={onModalDismiss}
        onModalColorChange={onModalColorChange}
      />
      <CustomBottomSheet visible={addCourseVisible} snapPoints={["65%"]}>
        <AddEditCourseForm onSubmit={onAddCourseSubmit} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
