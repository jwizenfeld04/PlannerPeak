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
  getCourseSpecificAssignments,
  selectCourseSpecficAssignments,
} from "../redux/features/assignment/assignmentSlice";
import courseScreenStyles from "../styles/courseScreenStyles";
import { getCourses } from "./getCourses";
import { getAssignments } from "./getAssignments";
import { Ionicons } from "@expo/vector-icons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import { radioButtonsData } from "./courseRadioButtons";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Gets string of user token from DB
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const courseSpecficAssignments = useSelector(selectCourseSpecficAssignments);
  const [isRefreshing, setIsRefreshing] = useState(false); // Used for pulldown refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const getAllCourses = getCourses(dispatch);
  const getAllAssignments = getAssignments(dispatch);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const handleOnCoursePressIn = (item) => {
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

  const handleAssignmentListEmpty = () => {
    return <Text style={courseScreenStyles.courseTitle}>No Assignments</Text>;
  };

  const handleRadioButtonColor = () => {
    if (modalData.color === "red") {
      return 0;
    }
    if (modalData.color === "orange") {
      return 1;
    }
    if (modalData.color === "yellow") {
      return 2;
    }
    if (modalData.color === "green") {
      return 3;
    }
    if (modalData.color === "blue") {
      return 4;
    }
    if (modalData.color === "purple") {
      return 5;
    }
  };

  const NotificationCheckBox = () => {
    const [courseNotifications, setCourseNotifications] = useState(
      modalData.notifications
    );

    function onCheckmarkPress() {
      setCourseNotifications(!courseNotifications);
      setModalData((prevState) => ({
        ...prevState,
        notifications: !courseNotifications,
      }));
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

  const CourseColorRadioButtons = () => {
    const [checkedColor, setCheckedColor] = useState(modalData.color);
    const [value, setValue] = useState(handleRadioButtonColor());

    function onRadioPress(checkedColor, i) {
      setCheckedColor(checkedColor);
      setModalData((prevState) => ({
        ...prevState,
        color: checkedColor,
      }));
      setValue(i);
    }

    return (
      <View style={courseScreenStyles.radioButton}>
        <RadioForm formHorizontal={true} animation={true} initial={value}>
          {/* To create radio buttons, loop through your array of options */}
          {radioButtons.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={value === i}
                onPress={() => onRadioPress(obj.value, i)}
                borderWidth={1}
                buttonInnerColor={value === i ? checkedColor : "#000"}
                buttonOuterColor={value === i ? "#2196f3" : "#000"}
                buttonSize={30}
                buttonOuterSize={40}
                buttonStyle={{}}
                buttonWrapStyle={{ marginLeft: 20 }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    );
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

  const handleModalNameColor = () => {
    if (modalData.color) {
      return `${modalData.color}`;
    } else {
      return "black";
    }
  };

  const styles = (color) =>
    StyleSheet.create({
      courseView: {
        borderColor: color,
        borderWidth: 3,
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginBottom: 12,
        marginTop: 12,
      },
    });

  const styles2 = StyleSheet.create({
    courseModalName: {
      fontSize: 30,
      textAlign: "center",
      justifyContent: "center",
      color: handleModalNameColor(),
    },
    courseTitle: {
      fontSize: 24,
      color: "black",
      textAlign: "center",
      justifyContent: "center",
    },
  });

  return (
    <SafeAreaView style={courseScreenStyles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={false}
        onDismiss={() => {
          dispatch(updateUserCoursePrefrences(modalData));
          getAllCourses(token, isSchoologyAuthenticated);
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
          <Text style={styles2.courseModalName}>{modalData.name}</Text>

          <View>
            <View style={courseScreenStyles.assignmentBorder}>
              <FlatList
                ListEmptyComponent={handleAssignmentListEmpty}
                data={courseSpecficAssignments}
                // Missing item key - possibly use course id instead with keyExtractor
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
          <Text style={courseScreenStyles.coursePreferences}>Prefrences</Text>
          <Text>Color: {modalData.color}</Text>

          <CourseColorRadioButtons />
          <Text>Priority: {modalData.priority}</Text>
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
                <View style={styles(item.color).courseView}>
                  <ListItem.Title style={styles2.courseTitle}>
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
