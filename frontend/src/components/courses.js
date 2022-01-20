import React, { useState, useEffect } from "react";
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
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectIsSchoologyAuthenticated,
} from "../redux/features/user/userSlice";
import {
  selectCourses,
  updateUserCoursePrefrences,
} from "../redux/features/course/courseSlice";
import { ListItem } from "react-native-elements";
import {
  selectAssignments,
  getCourseSpecificAssignments,
  selectCourseSpecficAssignments,
} from "../redux/features/assignment/assignmentSlice";
import courseScreenStyles from "../styles/courseScreenStyles";
import { getCourses } from "./getCourses";
import { getAssignments } from "./getAssignments";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Gets string of user token from DB
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const assignments = useSelector(selectAssignments); // Gets array of objects for all user assignments
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const courseSpecficAssignments = useSelector(selectCourseSpecficAssignments);
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const getAllCourses = getCourses(dispatch);
  const getAllAssignments = getAssignments(dispatch);
  const [courseData, setCourseData] = useState({});
  const [checkedColor, setCheckedColor] = useState("first");
  const [prefrencesData, setPrefrencesData] = useState({});

  const handleOnCoursePressIn = (item) => {
    setCourseData({ token: token, id: item.id });
    setModalVisible(true);
    setModalData({
      name: item.name,
      grade: item.grade,
      color: item.color,
      priority: item.priority,
      notifications: item.notifications,
    });
    setPrefrencesData({
      id: item.id,
      token: token,
      color: item.color,
      priority: item.priority,
      notifications: item.notifications,
    });
  };

  const handleAssignmentListEmpty = () => {
    return <Text style={courseScreenStyles.courseTitle}>No assignments</Text>;
  };

  const NotificationCheckBox = () => {
    const [courseNotifications, setCourseNotifications] = useState(true);

    function onCheckmarkPress() {
      setCourseNotifications(!courseNotifications);
    }

    return (
      <Pressable
        style={[
          courseScreenStyles.checkboxBase,
          courseNotifications && courseScreenStyles.checkboxChecked,
        ]}
        onPress={onCheckmarkPress}
      >
        {courseNotifications && (
          <Ionicons name="checkmark" size={24} color="white" />
        )}
      </Pressable>
    );
  };

  // Retrieves all courses any time the tab renders or user signs in with Schoology
  useEffect(() => {
    getAllCourses(token, isSchoologyAuthenticated);
  }, [isSchoologyAuthenticated]);

  useEffect(() => {
    dispatch(getCourseSpecificAssignments(courseData));
  }, [courseData]);

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
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={false}
        onDismiss={() => {
          dispatch(updateUserCoursePrefrences(prefrencesData));
        }}
      >
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={courseScreenStyles.closeText}>Return to Courses</Text>
          </TouchableOpacity>
          <Text style={courseScreenStyles.courseModalName}>
            {modalData.name}
          </Text>

          <View>
            <View style={courseScreenStyles.assignmentBorder}>
              <FlatList
                ListEmptyComponent={handleAssignmentListEmpty}
                data={courseSpecficAssignments}
                // missing item key - possibly uses db id instead solution would be keyExtractorgit
                renderItem={({ item }) => {
                  return (
                    <View style={courseScreenStyles.courseBorder}>
                      <ListItem.Title style={courseScreenStyles.courseTitle}>
                        {item.name}
                      </ListItem.Title>
                    </View>
                  );
                }}
              />
            </View>
          </View>

          <Text>Color: {modalData.color}</Text>
          
        <RadioButton.Group onValueChange={checkedColor => setCheckedColor(checkedColor)} checkedColor={checkedColor}>
         <RadioButton.Item label="green" value="first" />
        <RadioButton.Item label="red" value="second" />
        <RadioButton.Item label="purple" value="third" />
        </RadioButton.Group>

         

          <Text>{modalData.priority}</Text>
          <NotificationCheckBox />
          {modalData.notifications ? (
            <Text>Notifications Enabled</Text>
          ) : (
            <Text>Notifications Disabled</Text>
          )}
        </SafeAreaView>
      </Modal>
      <View>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListHeaderComponent={ListHeader}
          data={courses}
          // missing item key - possibly uses db id instead solution would be keyExtractorgit
          renderItem={({ item }) => {
            return (
              <Pressable
                onPressIn={() => {
                  handleOnCoursePressIn(item);
                }}
              >
                <View style={courseScreenStyles.courseBorder}>
                  <ListItem.Title style={courseScreenStyles.courseTitle}>
                    {item.name}
                  </ListItem.Title>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
