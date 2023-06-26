import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BaseAppDimensions } from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import CustomText from "../base/CustomText";

export default function ScheduleBlock(props) {
  return (
    <View style={{ flexDirection: "row", height: BaseAppDimensions.screenHeight / 7 }}>
      <View style={{ width: BaseAppDimensions.screenWidth / 9.3 }}>
        <CustomText font="bold" size="s" styles={{ paddingBottom: 5 }}>
          {props.scheduledStart}
        </CustomText>
        <CustomText size="xs" styles={{ paddingBottom: 5, color: "grey" }}>
          {props.scheduledFinish}
        </CustomText>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="circle" type="entypo" color={props.color} size={14} />
        <View style={{ ...styles.lineContainer, borderColor: props.color }} />
      </View>
      <TouchableOpacity style={styles.taskContainer}>
        <View style={{ width: BaseAppDimensions.screenWidth / 1.7 }}>
          <CustomText font="bold" size="s" styles={{ padding: 5 }}>
            {props.name}
          </CustomText>
          <CustomText
            size="xs"
            numberOfLines={2}
            styles={{ padding: 5, paddingRight: 10 }}
          >
            {props.description}
          </CustomText>
          <CustomText size="xs" font="italic" styles={{ color: "red", padding: 4 }}>
            Due Date: {props.dueDate}
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: "center", paddingLeft: 10, paddingTop: 2 },
  lineContainer: {
    borderWidth: 1,
    height: BaseAppDimensions.screenHeight / 8.4,
    marginTop: 2,
  },
  taskContainer: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 4,
    height: BaseAppDimensions.screenHeight / 7.7,
    padding: 5,
    marginLeft: 10,
    marginTop: 2,
    flex: 1,
  },
});
