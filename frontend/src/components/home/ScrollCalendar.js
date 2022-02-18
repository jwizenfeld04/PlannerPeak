import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getSpecificDateSchedule } from "../../redux/features/assignment/assignmentSlice";

export default function ScrollCalendar(props) {
  const dispatch = useDispatch();
  const calendarStart = moment();
  const calendarEnd = moment().add(2, "months");
  const [scheduleData, setScheduleData] = useState(null);

  const onDateSelected = async (d) => {
    const date = moment(d).format("YYYY-MM-DD");
    setScheduleData({ token: props.token, date: date });
  };

  useEffect(() => {
    if (scheduleData !== null) {
      dispatch(getSpecificDateSchedule(scheduleData));
    }
  }, [scheduleData]);

  return (
    <CalendarStrip
      scrollable={true}
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={{
        type: "border",
        duration: 200,
        borderWidth: 1,
        borderHighlightColor: "white",
      }}
      style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
      calendarHeaderStyle={{ color: "white" }}
      calendarColor={"#7743CE"}
      dateNumberStyle={{ color: "white" }}
      dateNameStyle={{ color: "white" }}
      highlightDateNumberStyle={{ color: "yellow" }}
      highlightDateNameStyle={{ color: "yellow" }}
      disabledDateNameStyle={{ color: "grey" }}
      disabledDateNumberStyle={{ color: "grey" }}
      iconContainer={{ flex: 0.1 }}
      startingDate={calendarStart}
      minDate={calendarStart}
      maxDate={calendarEnd}
      onDateSelected={onDateSelected}
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
