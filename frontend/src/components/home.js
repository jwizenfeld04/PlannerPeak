import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
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
import ScrollCalendar from "./scrollCalendar";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (schedule !== null && currentAssignment !== null) {
        getCurrentAssignmentTimeRemaining(currentAssignment);
      }
    }, 1000);
    return () => clearInterval(intervalId); //This is important
  }, [currentAssignment]);

  useEffect(() => {
    if (scheduleData !== null) {
      dispatch(getSpecificDateSchedule(scheduleData));
    }
  }, [scheduleData]);

  const CurrentAssignment = () => {
    return (
      <View style={styles.currentAssignmentView}>
        {currentAssignment ? (
          <View>
            <Text style={styles.currentAssignmentText}>
              {currentAssignment.name}
            </Text>
            {remainingTime !== 0 ? (
              <Text>{remainingTime} minutes left</Text>
            ) : (
              <Text></Text>
            )}
          </View>
        ) : (
          <View>
            <Text>No current assignment </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollCalendar />
      <Text>Welcome {name}</Text>
      <CurrentAssignment />
      <Button
        title="Update Schedule"
        onPress={() => {
          dispatch(scheduleAssignments(token));
          dispatch(getCurrentSchedule(token));
        }}
      />
      <Button
        title="Get Date Schedule"
        onPress={() => {
          setScheduleData({ token: token, date: "2022-02-21" });
        }}
      />
      <Button
        title="Log Schedule"
        onPress={() => {
          console.log(dateSchedule);
        }}
      />
    </View>
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
