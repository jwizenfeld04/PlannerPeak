import React from "react";
import { View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

import TouchableIcon from "../base/TouchableIcon";
import CustomText from "../base/CustomText";
import { AppColors } from "../../styles/globalStyles";

export default function ScrollCalendar(props) {
  const calendarStart = moment();
  const calendarEnd = moment().add(2, "months");

  const onDateSelected = (date) => {
    props.setSelectedDate(date);
    const startDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    const endDate = moment(date).endOf("day").format("YYYY-MM-DDTHH:mm:ss.sssZ");
    props.getCurrentEvents(startDate, endDate);
  };

  return (
    <View style={{ height: 130 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ paddingLeft: 20 }}>
          <CustomText text="Today" size={18} color="grey" />
          <CustomText
            text={`${calendarStart.format("dddd, D MMMM")}`}
            size="l"
            font="bold"
          />
        </View>
        <View style={{ paddingRight: 25, paddingTop: 12 }}>
          <TouchableIcon name="notifications" type="ionicon" />
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
        style={{ height: 230, paddingLeft: 15, paddingRight: 15 }}
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
