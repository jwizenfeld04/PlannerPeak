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
  selectCurrentSchedule
} from "../redux/features/assignment/assignmentSlice";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const currentAssignment = useSelector(selectCurrentAssignment);
  const schedule = useSelector(selectCurrentSchedule)

  useEffect(() => {
    dispatch(getUserInfo(token)); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variable to clear it.
  //     dispatch(getCurrentAssignment(token));
  //   }, 5000);
  //   console.log("HERE1");
  //   return () => clearInterval(intervalId); //This is important
  // }, [currentAssignment]);

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
      <Button title="Get Current Assignment" onPress={()=> {dispatch(getCurrentAssignment(token));}} />
      <Button title="Get Current Schedule" onPress={()=> {dispatch(getCurrentSchedule(token))}} />
      <Button title="Log Current Schedule" onPress={()=> console.log(schedule)} />
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
