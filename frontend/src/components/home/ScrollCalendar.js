import React, { Component } from "react";
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
  return (
    <SafeAreaView style={{ minHeight: 1, minWidth: 1 }}>
      <CalendarStrip
        scrollable
        style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={"#3343CE"}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
      />
    </SafeAreaView>
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
