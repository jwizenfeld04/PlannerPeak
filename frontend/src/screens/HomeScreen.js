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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../redux/features/user/userSlice";
import { useState, useEffect } from "react";
import { selectToken, selectUserName } from "../redux/features/user/userSlice";
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
import TimeTable from "../components/home/TimeTable";
import Header from "../components/base/Header";
import { AppColors, AppDimensions } from "../styles/globalStyles";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const currentAssignment = useSelector(selectCurrentAssignment);
  const schedule = useSelector(selectCurrentSchedule);
  const [remainingTime, setRemainingTime] = useState(null);
  const dateSchedule = useSelector(selectDateSchedule);
  const [scheduleData, setScheduleData] = useState(null);

  const getCurrentAssignmentTimeRemaining = (assignment) => {
    const now = new Date();
    const finish = new Date(assignment.scheduled_finish);
    setRemainingTime(difMinutes(now, finish));
  };

  const difMinutes = (dt1, dt2) => {
    const diff = (dt2.getTime() - dt1.getTime()) / 60000;
    return Math.abs(Math.ceil(diff)); // change so neg time means skip assignment
  };

  useEffect(() => {
    dispatch(getUserInfo(token)); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (schedule !== null) {
        dispatch(getCurrentSchedule(token));
      }
    }, 1000);
    return () => clearInterval(intervalId); //This is important
  }, [schedule]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variable to clear it.
  //     if (schedule !== null && currentAssignment !== null) {
  //       getCurrentAssignmentTimeRemaining(currentAssignment);
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalId); //This is important
  // }, [currentAssignment]);

  useEffect(() => {
    if (scheduleData !== null) {
      dispatch(getSpecificDateSchedule(scheduleData));
    }
  }, [scheduleData]);

  return (
    <Fragment>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }}
      />
      <SafeAreaView>
        <Header
          backgroundColor={AppColors.primaryBackgroundColor}
          borderBottomColor={AppColors.primaryAccentColor}
          title={"Home"} //required
          titleAlign={"flex-start"} //required
          titleColor={AppColors.primaryAccentColor}
          titleSize={36} //default 36
        />
        <ScrollCalendar token={token} />
        {/* <CurrentAssignment
        currentAssignment={currentAssignment}
        remainingTime={remainingTime}
        />
        <Button
        title="Update Schedule"
        onPress={() => {
          dispatch(scheduleAssignments(token));
          dispatch(getCurrentSchedule(token));
        }}
        />
        <Button
        title="Fetch Schedule"
        onPress={() => {
          dispatch(getCurrentSchedule(token));
        }}
      /> */}
        {/* <Button
        title="Log Date Schedule"
        onPress={() => {
          console.log(dateSchedule);
        }}
        />
        <Button
        title="Log Schedule"
        onPress={() => {
          console.log(schedule);
        }}
      /> */}
        <TimeTable schedule={dateSchedule} />
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
  currentAssignmentView: {
    paddingTop: 20,
  },
  currentAssignmentText: {
    borderColor: "black",
    borderWidth: 2,
    fontSize: 20,
  },
});
