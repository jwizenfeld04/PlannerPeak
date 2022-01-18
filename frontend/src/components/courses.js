import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  Linking,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectToken,
  selectIsSchoologyAuthenticated,
} from "../redux/features/user/userSlice";
import {
  getSchoologyCourses,
  getSchoologyGrades,
} from "../redux/features/schoology/schoologySlice";
import {
  selectCourses,
  getUserCourses,
} from "../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ListItem } from "react-native-elements";
import schoologyIcon from "../assets/images/schoology_icon.jpeg";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Gets string of user token from DB
  const courses = useSelector(selectCourses); // Gets array of objects for all user courses
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated); // Gets boolean of whether their Schoology account is authenticated or not
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Makes API request to Schoology and then makes API request to DB to get all courses
  const getCourses = (token, isSchoologyAuth) => {
    if (isSchoologyAuth === true) {
      dispatch(getSchoologyCourses(token))
        .then(unwrapResult)
        .then((obj) => {
          dispatch(getSchoologyGrades(token));
          dispatch(getUserCourses(token));
        })
        .catch((obj) => {
          console.log(obj);
        });
    } else {
      dispatch(getUserCourses(token));
    }
  };

  // Retrieves all courses any time the tab renders or user signs in with Schoology
  useEffect(() => {
    getCourses(token, isSchoologyAuthenticated);
  }, [isSchoologyAuthenticated]);

  // Retreives all courses on pull-down refresh; this function is passed into the flatlist
  const onRefresh = () => {
    setIsRefreshing(true); // Must set to true to initate it
    // Refresh code goes here
    getCourses(token, isSchoologyAuthenticated);
    setIsRefreshing(false); // Must set to false to end refresh
  };

  // Anything displayed in header goes here with styles; this function is passed into the flatlist
  const ListHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>Courses:</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListHeaderComponent={ListHeader}
        data={courses}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.grade}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: "#ADD8E6",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
});
