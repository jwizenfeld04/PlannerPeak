import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Calendar from "expo-calendar";
import { FloatingAction } from "react-native-floating-action";
import moment from "moment";

import ScrollCalendar from "../components/home/ScrollCalendar";
import CurrentAssignment from "../components/home/CurrentAssignment";
import ScheduleTable from "../components/home/ScheduleTable";
import { AppColors, AppFonts, AppImages } from "../styles/globalStyles";
import CustomText from "../components/base/CustomText";
import { selectCourses } from "../redux/features/course/courseSlice";
import CustomBottomSheet from "../components/base/CustomBottomSheet";
import AddAssignmentForm from "../components/home/AddAssignmentForm";
import AddTaskForm from "../components/home/AddTaskForm";

import { getUserInfo } from "../redux/features/user/userSlice";
import { selectIsVerified } from "../redux/features/schoology/schoologySlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const [addAssignmentVisible, setAddAssignmentVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const courses = useSelector(selectCourses);
  const courseNames = courses.map((obj) => ({ label: obj.name, value: obj.name }));

  useEffect(() => {
    dispatch(getUserInfo()); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

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
      <CustomText size={18} styles={{ padding: 15, paddingLeft: 20 }}>
        Current Task
      </CustomText>
      <CurrentAssignment />
      <CustomText size={18} styles={{ padding: 15, paddingLeft: 20 }}>
        Schedule
      </CustomText>
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
      <CustomBottomSheet visible={addAssignmentVisible} snapPoints={["68%"]}>
        <AddAssignmentForm courses={courseNames} />
      </CustomBottomSheet>
      <CustomBottomSheet visible={addTaskVisible} snapPoints={["68%"]}>
        <AddTaskForm />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
