import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getSpecificDateSchedule } from "../../redux/features/assignment/assignmentSlice";

export default function ScrollCalendar(props) {
  const dispatch = useDispatch();
  const calendarStart = moment();
  const calendarEnd = moment().add(2, "months");
  const [scheduleData, setScheduleData] = useState(null);

  const onDateSelected = (d) => {
    const date = moment(d).format("YYYY-MM-DD");
    setScheduleData({ token: props.token, date: date });
  };

  const onHeaderSelected = (weekStartDate, weekEndDate) => {
    //Add drop down calendar when that is clicked
    console.log("header selected");
  };

  useEffect(() => {
    if (scheduleData !== null) {
      dispatch(getSpecificDateSchedule(scheduleData));
    }
  }, [scheduleData]);

  return (
    <View style={{  height:200 }}>
      <CalendarStrip
        scrollable={true}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "blue",
        }}
        style={{paddingTop: 20, height:200}}
        calendarHeaderStyle={{ color: "black" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNumberStyle={{ color: "blue" }}
        highlightDateNameStyle={{ color: "blue" }}
        disabledDateNameStyle={{ color: "grey" }}
        disabledDateNumberStyle={{ color: "grey" }}
        iconContainer={{ flex: 0.1 }}
        iconStyle={{ display: "none" }}
        startingDate={calendarStart}
        selectedDate={calendarStart}
        minDate={calendarStart}
        maxDate={calendarEnd}
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
