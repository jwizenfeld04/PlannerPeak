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
import { getSchoologyCourses } from "../redux/features/schoology/schoologySlice";
import {
  selectCourses,
  getUserCourses,
} from "../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ListItem } from "react-native-elements";
import schoologyIcon from "../assets/images/schoology_icon.jpeg";

export default function Courses() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const courses = useSelector(selectCourses);
  const isSchoologyAuthenticated = useSelector(selectIsSchoologyAuthenticated);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const onRefresh = () => {
    setIsRefreshing(true);
    getCourses(token, isSchoologyAuthenticated);
    setIsRefreshing(false);
  };

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
