import React, { useState } from "react";
import moment from "moment";
import {
  ScrollView,
  SafeAreaView,
  View,
  Button,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import ScheduleBlock from "./ScheduleBlock";

export default function ScheduleTable(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ScheduleBlock
          color="green"
          name="Integrals HW"
          scheduledStart="9:30"
          scheduledFinish="10:20"
        />
        <ScheduleBlock
          color="red"
          name="History Essay"
          scheduledStart="11:30"
          scheduledFinish="12:20"
        />
        <ScheduleBlock
          color="blue"
          name="English Test"
          scheduledStart="1:30"
          scheduledFinish="2:20"
        />
        <ScheduleBlock
          color="green"
          name="Study for Math Test"
          scheduledStart="4:30"
          scheduledFinish="5:15"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BaseAppDimensions.screenWidth / 1.1,
    alignSelf: "center",
    padding: 5,
    flexDirection: "row",
    height: BaseAppDimensions.screenHeight / 2.05,
  },
  primaryTimeText: { fontFamily: AppFonts.SFBOLD, paddingBottom: 5 },
  secondaryTimeText: { fontFamily: AppFonts.SFRegular, color: "grey", fontSize: 12 },
});
