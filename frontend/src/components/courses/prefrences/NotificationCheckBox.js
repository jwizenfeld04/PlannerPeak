import courseScreenStyles from "../../../styles/courseScreenStyles";
import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationCheckBox = (props) => {
  return (
    <Pressable
      style={[
        courseScreenStyles.checkboxBase,
        props.courseNotifications && courseScreenStyles.checkboxChecked,
      ]}
      onPress={props.onPress}
    >
      {props.courseNotifications && (
        <Ionicons name="checkmark" size={24} color="white" />
      )}
    </Pressable>
  );
};

export default NotificationCheckBox;
