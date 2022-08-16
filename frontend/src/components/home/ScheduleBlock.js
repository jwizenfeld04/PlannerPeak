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
  TouchableOpacity,
} from "react-native";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import { Icon } from "react-native-elements";

export default function ScheduleBlock(props) {
  return (
    <View style={{ flexDirection: "row", height: 120 }}>
      <View style={{ width: 42 }}>
        <Text style={styles.primaryTimeText}>{props.scheduledStart}</Text>
        <Text style={styles.secondaryTimeText}>{props.scheduledFinish}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="circle" type="entypo" color={props.color} size={14} />
        <View style={{ ...styles.lineContainer, borderColor: props.color }} />
      </View>
      <TouchableOpacity style={styles.taskContainer}>
        <View style={{ width: BaseAppDimensions.screenWidth / 1.7 }}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            This is the descripiton of the assingment abbreviated dajndnkjadn aw
            jdnawkjdnw akjdn awkjnd jkanw dkjwan dkjanw kjdnkjwandkjndkjn jkwan d
          </Text>
          <Text style={styles.dateText}>Due Date: 8/4/22</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryTimeText: { fontFamily: AppFonts.SFBOLD, paddingBottom: 5 },
  secondaryTimeText: { fontFamily: AppFonts.SFRegular, color: "grey", fontSize: 12 },
  iconContainer: { alignItems: "center", paddingLeft: 10, paddingTop: 2 },
  lineContainer: {
    borderWidth: 1,
    height: 100,
    marginTop: 2,
  },
  taskContainer: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 4,
    height: 110,
    padding: 5,
    marginLeft: 10,
    marginTop: 2,
    flex: 1,
  },
  nameText: {
    padding: 5,
    fontFamily: AppFonts.SFBOLD,
    fontSize: 14,
  },
  descriptionText: {
    fontFamily: AppFonts.SFRegular,
    fontSize: 11,
    padding: 5,
    paddingRight: 10,
  },
  dateText: {
    fontFamily: AppFonts.SFItalic,
    fontSize: 11,
    color: "red",
    padding:4
  },
});
