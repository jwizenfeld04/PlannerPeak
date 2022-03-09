import courseScreenStyles from "../../../styles/courseScreenStyles";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationCheckBox = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ margin: 10, fontSize: 25 }}>Notifications: </Text>
      <Pressable
        style={[
          courseScreenStyles.checkboxBase,
          props.courseNotifications && courseScreenStyles.checkboxChecked,
        ]}
        onPress={() => props.onPress(props.courseNotifications)}
      >
        {props.courseNotifications && (
          <Ionicons name="checkmark" size={24} color="white" />
        )}
      </Pressable>
    </View>
  );
};

export default NotificationCheckBox;
