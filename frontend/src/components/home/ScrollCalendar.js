import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getSpecificDateSchedule } from "../../redux/features/assignment/assignmentSlice";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import CustomButton from "../base/Button";
import TouchableIcon from "../base/TouchableIcon";

export default function ScrollCalendar(props) {
  const dispatch = useDispatch();
  const calendarStart = moment();
  const calendarEnd = moment().add(2, "months");

  const onDateSelected = (date) => {
    props.setSelectedDate(date);
    const startDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    const endDate = moment(date).endOf("day").format("YYYY-MM-DDTHH:mm:ss.sssZ");
    props.getCurrentEvents(startDate, endDate);
  };

  // const handleHeaderText = (selectedDate) => {
  //   const today = moment();
  //   const newSelectedDate = moment(selectedDate);
  //   const formattedSelectedDate = newSelectedDate.format("YYYY-MM-DD");
  //   const formattedTommorowDate = today.clone().add(1, "day").format("YYYY-MM-DD");
  //   if (formattedSelectedDate === today.clone().format('YYYY-MM-DD')) {
  //     return "Today";
  //   } else if (formattedSelectedDate === formattedTommorowDate) {
  //     return "Tommorow";
  //   } else if (selectedDate.isBetween(today, today.clone().endOf('week'))) {
  //     return "This Week";
  //   } else if (selectedDate.isBetween(today, today.clone().endOf('month'))) {
  //     return "This Month";
  //   } else {
  //     return "This Year";
  //   }
  // };

  return (
    <View style={{ height: 130 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 18, color: "grey", fontFamily: AppFonts.SFRegular }}>
            Today
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: AppFonts.SFBOLD,
            }}
          >{`${calendarStart.format("dddd, D MMMM")}`}</Text>
        </View>
        <View style={{ paddingRight: 25, paddingTop:12 }}>
          <TouchableIcon name='notifications' type='ionicon'/>
        </View>
      </View>
      <CalendarStrip
        scrollable={true}
        scrollerPaging={true}
        showMonth={false}
        useIsoWeekday={false}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: AppColors.primaryBackgroundColor,
        }}
        style={{ height: 230, paddingLeft:15, paddingRight:15 }}
        dayComponentHeight={200}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        dayContainerStyle={{ backgroundColor: "white", height: 55, borderRadius: 10 }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateContainerStyle={{
          backgroundColor: AppColors.primaryBackgroundColor,
        }}
        disabledDateNameStyle={{ color: "grey" }}
        disabledDateNumberStyle={{ color: "grey" }}
        iconStyle={{ display: "none" }}
        startingDate={calendarStart}
        selectedDate={calendarStart}
        minDate={calendarStart}
        maxDate={calendarEnd}
        onDateSelected={onDateSelected}
      />
    </View>
  );
}
