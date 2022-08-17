import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
  SafeAreaView,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../redux/features/user/userSlice";
import { useState, useEffect } from "react";
import { selectIsVerified } from "../redux/features/schoology/schoologySlice";
import {
  scheduleAssignments,
  selectCurrentAssignment,
  getCurrentAssignment,
  getCurrentSchedule,
  selectCurrentSchedule,
  getSpecificDateSchedule,
  selectDateSchedule,
} from "../redux/features/assignment/assignmentSlice";
import ScrollCalendar from "../components/home/ScrollCalendar";
import CurrentAssignment from "../components/home/CurrentAssignment";
import ScheduleTable from "../components/home/ScheduleTable";
import Header from "../components/base/Header";
import {
  AppColors,
  AppDimensions,
  AppFonts,
  AppImages,
  BaseAppDimensions,
} from "../styles/globalStyles";
import CustomTextInput from "../components/base/textInput/TextInput";
import CustomButton from "../components/base/Button";
import * as Calendar from "expo-calendar";
import { FloatingAction } from "react-native-floating-action";
import AddAssignmentModal from "../components/home/AddAssignmentModal";
import AddTaskModal from "../components/home/AddTaskModal";
import moment from "moment";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const dateSchedule = useSelector(selectDateSchedule);
  const [addAssignmentVisible, setAddAssignmentVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    dispatch(getUserInfo()); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

  const getCurrentCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const yourCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      console.log({ yourCalendars });
    }
  };

  const getCurrentEvents = async (startDate, endDate) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const yourEvents = await Calendar.getEventsAsync(
        ["DE7394EF-67B3-487D-9981-BA7986281A93"],
        startDate,
        endDate
      );
    }
  };

  const actions = [
    {
      icon: AppImages.addTaskIcon,
      name: "assignment",
      position: 2,
      color: AppColors.primaryBackgroundColor,
      text: "Add Assignment",
      textStyle: { fontFamily: AppFonts.SFRegular, color: "black" },
    },
    {
      icon: AppImages.addTaskIcon,
      name: "task",
      position: 1,
      color: AppColors.primaryBackgroundColor,
      text: "Add Task",
      textStyle: { fontFamily: AppFonts.SFRegular, color: "black" },
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollCalendar
        getCurrentEvents={getCurrentEvents}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text style={styles.headerText}>Current Task</Text>
      <CurrentAssignment />
      <Text style={styles.headerText}>Schedule</Text>
      <ScheduleTable selectedDate={selectedDate.format('YYYY-MM-DD')}/>
      <FloatingAction
        actions={actions}
        color={AppColors.primaryBackgroundColor}
        onPressItem={(name) => {
          if (name === "assignment") {
            setAddAssignmentVisible(!addAssignmentVisible);
          } else if (name === "task") {
            setAddTaskVisible(!addTaskVisible);
          }
        }}
      />
      <AddAssignmentModal
        visible={addAssignmentVisible}
        setVisible={setAddAssignmentVisible}
      />
      <AddTaskModal visible={addTaskVisible} setVisible={setAddTaskVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    padding: 15,
    paddingLeft: 20,
    fontFamily: AppFonts.SFRegular,
    fontSize: 18,
  },
});
