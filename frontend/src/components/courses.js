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
  ScrollView,
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
import { ListItem, Icon } from "react-native-elements";
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
import SchoologyIcon from "../assets/images/schoology_icon.png";
import PlannerPeakIcon from "../assets/images/planner_peak_logo.png";

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

  const handleAssignmentListEmpty = () => {
    return <Text style={courseScreenStyles.courseTitle}>No Assignments</Text>;
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

    function onRadioPress(checkedColor) {
      setCheckedColor(checkedColor);
      setModalData((prevState) => ({
        ...prevState,
        color: checkedColor,
      }));
    }

    return (
      <View style={courseScreenStyles.radioButton}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={225} //your element width
          snapToAlignment={"center"}
        >
          <RadioForm
            formHorizontal={true}
            animation={true}
            initial={checkedColor}
          >
            {/* To create radio buttons, loop through your array of options */}
            {radioButtons.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={true}
                  onPress={() => onRadioPress(obj.value)}
                  borderWidth={2}
                  buttonInnerColor={obj.value}
                  buttonOuterColor={
                    checkedColor === obj.value ? "black" : "white"
                  }
                  buttonSize={30}
                  buttonOuterSize={39}
                  buttonWrapStyle={{ marginLeft: 12, marginRight:12 }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </ScrollView>
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
        backgroundColor: color,
        borderWidth: 0,
        borderRadius: 10,
        width: 350,
        height: 45,
        marginBottom: 12,
        marginTop: 12,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowOffset: { height: 3, width: -3 },
        shadowColor: color,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        flexDirection: "row",
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
      fontSize: 20,
      color: "black",
      justifyContent: "center",
    },
    flatList: {
      justifyContent: "center",
      alignItems: "center",
    },
    courseIcon: {
      width: "13%",
      height: "100%",
      marginRight: 10,
    },
    courseHeaderTitle: {
      fontSize: 40,
      color: "black",
      textAlign: "center",
      marginBottom: 10,
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
            <Ionicons
              name="arrow-back-outline"
              size={40}
              color={modalData.color}
            />
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
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
            Color
          </Text>

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
      <View style={{ height: 675 }}>
        <Text style={styles2.courseHeaderTitle}>My Courses</Text>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          data={courses}
          contentContainerStyle={styles2.flatList}
          // missing item key - possibly uses db id instead solution would be keyExtractorgit
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleOnCoursePress(item);
                }}
              >
                <View style={styles(item.color).courseView}>
                  {item.is_schoology ? (
                    <Image source={SchoologyIcon} style={styles2.courseIcon} />
                  ) : (
                    <Image
                      source={PlannerPeakIcon}
                      style={styles2.courseIcon}
                    />
                  )}
                  <ListItem.Title style={styles2.courseTitle}>
                    {item.name}
                  </ListItem.Title>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
