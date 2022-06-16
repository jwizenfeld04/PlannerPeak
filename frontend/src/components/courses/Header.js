import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";


export default function Header(props) {
  //ADD ANDROID SUPPORT WITH BOTTOM SHEETS (react-native-js-bottom-sheet)
  const onSortPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Sort Courses", "Cancel"],
        title: "Courses",
        cancelButtonIndex: 1,
        userInterfaceStyle: "light",
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onActionSheetPress();
        } else if (buttonIndex === 1) {
          // cancel action
        }
      }
    );
  };
  const onActionSheetPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Priority", "Grade", "Assignments", "Cancel"],
        title: "Sort By...",
        cancelButtonIndex: 3,
        userInterfaceStyle: "light",
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
           props.setSort("priority")
        } else if (buttonIndex === 1) {
            props.setSort("grade")
        } else if (buttonIndex === 2) {
            props.setSort("number_of_assignments")
        } else if (buttonIndex === 3) {
             // cancel action
        }
      }
    );
  };
  return (
    <View
      style={{ flexDirection: "row", height: 70, backgroundColor: "#2476B1", marginBottom:10 }}
    >
      <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
        <Text style={{ fontSize: 36, color: "#B7D7EA" }}>Courses</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <TouchableOpacity onPress={onSortPress}>
          <Entypo name="dots-three-horizontal" size={30} color="#B7D7EA" />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={props.onCreateModalPress}>
          <Ionicons name="add-circle-outline" size={30} color="#B7D7EA" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


// return (
//     <ActionSheet
//       title={"Courses"}
//       message={"Message goes here"}
//       cancelButtonIndex={1}
//       destructiveButtonIndex={1}
//       options={[
//         { label: "Sort Courses", onPress: onActionSheetPress() },
//         { label: "Cancel", onPress: () => {} },
//       ]}
//     />
//   );