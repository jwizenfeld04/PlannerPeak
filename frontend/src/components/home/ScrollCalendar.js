import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getSpecificDateSchedule } from "../../redux/features/assignment/assignmentSlice";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";

export default function ScrollCalendar(props) {
  const dispatch = useDispatch();
  const calendarStart = moment();
  const calendarEnd = moment().add(2, "months");

  const onDateSelected = (date) => {
    const startDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    const endDate = moment(date).endOf("day").format("YYYY-MM-DDTHH:mm:ss.sssZ");
    props.getCurrentEvents(startDate, endDate);
  };

  const onHeaderSelected = (weekStartDate, weekEndDate) => {
    console.log("header selected");
  };

  return (
    <View style={{ height: 300 }}>
      <CalendarStrip
        scrollable={true}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: AppColors.primaryBackgroundColor,
        }}
        style={{ paddingTop: 10, height: 300 }}
        dayComponentHeight={200}
        calendarHeaderStyle={{
          color: "black",
          textAlign: "left",
          fontSize: 20,
          fontFamily: AppFonts.SFBOLD,
          paddingLeft: 15,
          width: BaseAppDimensions.screenWidth,
        }}
        dateNumberStyle={{ color: "black" }}
        headerText="Current Assignment"
        dateNameStyle={{ color: "black" }}
        dayContainerStyle={{ backgroundColor: "white", height: 55, borderRadius: 10 }}
        highlightDateNumberStyle={{ color: AppColors.primaryBackgroundColor }}
        highlightDateNameStyle={{ color: AppColors.primaryBackgroundColor }}
        disabledDateNameStyle={{ color: "grey" }}
        disabledDateNumberStyle={{ color: "grey" }}
        iconStyle={{ display: "none" }}
        startingDate={calendarStart}
        selectedDate={calendarStart}
        minDate={calendarStart}
        maxDate={calendarEnd}
        markedDates={[{"date":Date.now(), dots:[{color:AppColors.primaryBackgroundColor}]}]}
        onDateSelected={onDateSelected}
        onHeaderSelected={onHeaderSelected}
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
});
