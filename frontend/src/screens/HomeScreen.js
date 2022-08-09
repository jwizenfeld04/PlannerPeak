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
import CustomTextInput from "../components/base/textInput/TextInput";
import CustomButton from "../components/base/Button";
import * as Calendar from "expo-calendar";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified); // Boolean whether schoology callback deeplink was hit properly
  const dateSchedule = useSelector(selectDateSchedule);

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
      console.log({ yourEvents });
    }
  };

  return (
    <Fragment> 
      <SafeAreaView
        style={{ flex: 0, backgroundColor: "white" }}
      />
      <SafeAreaView style={{backgroundColor:'white', flex:1}}>
        <ScrollCalendar getCurrentEvents={getCurrentEvents} />
        <Button title="Get Current Calendars" onPress={getCurrentCalendar} />
        <Button title="Get Current Events" onPress={getCurrentEvents} />
      </SafeAreaView>
    </Fragment>
  );
}
