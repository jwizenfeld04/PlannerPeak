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
} from "../redux/features/assignment/assignmentSlice";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const currentAssignment = useSelector(selectCurrentAssignment);
  const schedule = useSelector(selectCurrentSchedule);
  const [remainingTime, setRemainingTime] = useState(null);

  const getCurrentAssignmentTimeRemaining = (assignment) => {
    const now = new Date();
    const currentTime = new Date(now.toUTCString().slice(0, -4));
    const finishTime = assignment.scheduled_finish;
    setRemainingTime(finishTime - currentTime);
  };

  useEffect(() => {
    dispatch(getUserInfo(token)); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (schedule.length !== 0) {
        dispatch(getCurrentSchedule(token));
      }
    }, 5000);
    return () => clearInterval(intervalId); //This is important
  }, [schedule]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (schedule.length !== 0) {
        getCurrentAssignmentTimeRemaining(currentAssignment);
      }
    }, 1000);
    return () => clearInterval(intervalId); //This is important
  }, [currentAssignment, remainingTime]);

  const CurrentAssignment = () => {
    return (
      <View style={styles.currentAssignmentView}>
        {currentAssignment ? (
          <View>
            <Text style={styles.currentAssignmentText}>
              {currentAssignment.name}
            </Text>
            <Text style={styles.currentAssignmentText}>
              {currentAssignment.scheduled_start}
            </Text>
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
      <Text>Welcome {name}</Text>
      <CurrentAssignment />
      <Button
        title="Update Schedule"
        onPress={() => {
          dispatch(scheduleAssignments(token));
        }}
      />
      <Button
        title="Get Current Schedule"
        onPress={() => {
          dispatch(getCurrentSchedule(token));
        }}
      />
      <Button
        title="Get Time Remaining"
        onPress={() => {
          getCurrentAssignmentTimeRemaining(currentAssignment);
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
