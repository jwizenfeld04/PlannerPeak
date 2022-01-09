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
import { useState, useEffect } from "react";
import {
  selectToken,
  selectIsSchoologyAuthenticated,
} from "../redux/features/user/userSlice";
import { getSchoologyCourses } from "../redux/features/schoology/schoologySlice";
import {
  selectCourses,
  getUserCourses,
} from "../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const courses = useSelector(selectCourses);
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated);

  const getCourses = (token, isSchoologyAuth) => {
    if (isSchoologyAuth === true) {
      dispatch(getSchoologyCourses(token))
        .then(unwrapResult)
        .then((obj) => {
          dispatch(getUserCourses(token));
        })
        .catch((obj) => {
          console.log(obj);
        });
    } else {
      dispatch(getUserCourses(token));
    }
  };

  useEffect(() => {
    getCourses(token, isSchoologyAuthenticated);
  }, [isSchoologyAuthenticated]);

  const allCourses = () => {
    return courses.map((course, index) => (
      <Text key={index}>{course.name}</Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Courses:</Text>
      {allCourses()}
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
});
