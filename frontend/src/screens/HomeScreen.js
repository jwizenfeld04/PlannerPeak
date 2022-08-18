import React from "react";
import { SafeAreaView } from "react-native";
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
import { AppColors, AppFonts, AppImages } from "../styles/globalStyles";
import * as Calendar from "expo-calendar";
import { FloatingAction } from "react-native-floating-action";
import AddAssignmentModal from "../components/home/AddAssignmentModal";
import AddTaskModal from "../components/home/AddTaskModal";
import moment from "moment";
import CustomText from "../components/base/CustomText";
import { selectCourses } from "../redux/features/course/courseSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const dateSchedule = useSelector(selectDateSchedule);
  const [addAssignmentVisible, setAddAssignmentVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const courses = useSelector(selectCourses)
  const courseNames = courses.map((obj) => ({ label: obj.name, value: obj.name }));

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
      <CustomText
        text="Current Task"
        size={18}
        styles={{ padding: 15, paddingLeft: 20 }}
      />
      <CurrentAssignment />
      <CustomText text="Schedule" size={18} styles={{ padding: 15, paddingLeft: 20 }} />
      <ScheduleTable selectedDate={selectedDate.format("YYYY-MM-DD")} />
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
        courses={courseNames}
      />
      <AddTaskModal visible={addTaskVisible} setVisible={setAddTaskVisible} />
    </SafeAreaView>
  );
}
