import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  Linking,
  TextInput,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectIsSchoologyAuthenticated,
} from "../redux/features/user/userSlice";
import { selectCourses } from "../redux/features/course/courseSlice";
import { ListItem } from "react-native-elements";
import { selectAssignments } from "../redux/features/assignment/assignmentSlice";
import courseScreenStyles from "../styles/courseScreenStyles";
import { getCourses } from "./getCourses";
import { getAssignments } from "./getAssignments";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Gets string of user token from DB
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const assignments = useSelector(selectAssignments); // Gets array of objects for all user assignments
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCourseName, setModalCourseName] = useState("");
  const getAllCourses = getCourses(dispatch);
  const getAllAssignments = getAssignments(dispatch);

  const handleOnCoursePress = (item) => {
    setModalVisible(true);
    setModalCourseName(item);
  };

  // Retrieves all courses any time the tab renders or user signs in with Schoology
  useEffect(() => {
    getAllCourses(token, isSchoologyAuthenticated);
  }, [isSchoologyAuthenticated]);

  // Retreives all courses on pull-down refresh; this function is passed into the flatlist
  const onRefresh = () => {
    setIsRefreshing(true); // Must set to true to initate refresh
    // Refresh code goes here
    getAllCourses(token, isSchoologyAuthenticated);
    getAllAssignments(token, isSchoologyAuthenticated);
    setIsRefreshing(false); // Must set to false to end refresh
  };

  // Anything displayed in header goes here with styles; this function is passed into the flatlist
  const ListHeader = () => {
    return (
      <View>
        <Text style={courseScreenStyles.headerText}>Courses:</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={courseScreenStyles.container}>
      <Modal animationType="fade" visible={modalVisible} transparent={false}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={courseScreenStyles.closeText}>Go back</Text>
            <Text>{modalCourseName}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <View style={courseScreenStyles.courseBorder}>

      <FlatList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListHeaderComponent={ListHeader}
        data={courses}
        // missing item key - possibly uses db id instead solution would be keyExtractorgit
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handleOnCoursePress(item.name)}>
              <View style={courseScreenStyles.courseBorder}>
                <ListItem.Title style={courseScreenStyles.courseTitle}>
                  {item.name}
                </ListItem.Title>
              </View>
            </TouchableOpacity>
          );
        }}
        />
        </View>
        <View >
          <Text style={courseScreenStyles.test}>Text</Text>
        </View>
    </SafeAreaView>
  );
}
