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
  Modal
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
import AddTaskModal from "../components/home/AddTaskModal";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const dateSchedule = useSelector(selectDateSchedule);
  const [addTaskVisible, setAddTaskVisible] = useState(false);

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
      console.log({ yourEvents });
    }
  };

  const actions = [
    {
      icon: AppImages.addTaskIcon,
      name: "add_task",
      position: 1,
      color: AppColors.primaryBackgroundColor,
    },
    {
      icon: AppImages.addTaskIcon,
      name: "add_task2",
      position: 3,
      color: AppColors.primaryBackgroundColor,
    },
    {
      icon: AppImages.addTaskIcon,
      name: "add_task3",
      position: 2,
      color: AppColors.primaryBackgroundColor,
    },
  ];

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollCalendar getCurrentEvents={getCurrentEvents} />
        <Text style={styles.headerText}>Current Task</Text>
        <CurrentAssignment />
        <Text style={styles.headerText}>Schedule</Text>
        <ScheduleTable />
        <FloatingAction
          onPressMain={() => {
            setAddTaskVisible(!addTaskVisible)
          }}
          showBackground={false}
          floatingIcon={AppImages.addTaskIcon}
          iconHeight={30}
          iconWidth={30}
          color={AppColors.primaryBackgroundColor}
        />
          <AddTaskModal visible={addTaskVisible} setVisible={setAddTaskVisible}/>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerText: {
    padding: 15,
    paddingLeft:20,
    fontFamily: AppFonts.SFRegular,
    fontSize: 18,
  },
});
