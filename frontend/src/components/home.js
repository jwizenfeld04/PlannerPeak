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
import { scheduleAssignments } from "../redux/features/assignment/assignmentSlice";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly

  useEffect(() => {
    dispatch(getUserInfo(token)); // Rerenders user info any time page renders or schoology becomes authenticated
  }, [isVerified]);

  const CurrentAssignment = () => {
    return (
      <View style={styles.currentAssignmentView}>
        <Text style={styles.currentAssignmentText}>Current Assignment</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {name}</Text>
      <CurrentAssignment />
      <Button title="Update Schedule" onPress={()=> {dispatch(scheduleAssignments(token))}} />
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
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 20,
  }
});
