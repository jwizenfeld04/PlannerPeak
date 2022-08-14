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
  const [selectedDate, setSelectedDate] = useState(moment());

  const onDateSelected = (date) => {
    setSelectedDate(date);
    const startDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    const endDate = moment(date).endOf("day").format("YYYY-MM-DDTHH:mm:ss.sssZ");
    props.getCurrentEvents(startDate, endDate);
  };
  return (
    <View style={{ height: 300 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontSize: 20, color: "grey" }}>Today</Text>
        </View>
      </View>
      <CalendarStrip
        scrollable={true}
        scrollerPaging={true}
        headerText={`${selectedDate.format("ddd, D MMM")}`}
        useIsoWeekday={false}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: AppColors.primaryBackgroundColor,
        }}
        style={{ height: 270 }}
        dayComponentHeight={200}
        calendarHeaderStyle={{
          color: "black",
          textAlign: "left",
          fontSize: 25,
          fontFamily: AppFonts.SFBOLD,
          paddingLeft: 10,
          width: BaseAppDimensions.screenWidth,
        }}
        dateNumberStyle={{ color: "black" }}
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
        onDateSelected={onDateSelected}
      />
    </View>
  );
}
