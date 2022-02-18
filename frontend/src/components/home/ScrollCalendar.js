import React, { Component, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  Linking,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useSelector, useDispatch } from "react-redux";

export default function ScrollCalendar() {
  const date = new Date();

  useEffect(() => {
    console.log(date);
  }, []);

  return (
    <CalendarStrip
      scrollable
      style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
      calendarColor={"#3343CE"}
      calendarHeaderStyle={{ color: "white" }}
      dateNumberStyle={{ color: "white" }}
      dateNameStyle={{ color: "white" }}
      startingDate={date}
      minDate={date}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
