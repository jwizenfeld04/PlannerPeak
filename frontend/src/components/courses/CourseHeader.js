import React from "react";
import { View } from "react-native";

import TouchableIcon from "../base/TouchableIcon";
import CustomText from "../base/CustomText";

export default function CourseHeader(props) {
  return (
    <View
      style={{
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <CustomText text="Courses" font="bold" size="xl" />
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
      >
        <TouchableIcon
          name="ellipsis-horizontal"
          type="ionicon"
          size={30}
          style={{ paddingRight: 19 }}
          onPress={props.onActionSheetPress}
        />
        <TouchableIcon
          name="md-add"
          type="ionicon"
          size={36}
          style={{ paddingRight: 15 }}
          onPress={() => props.setAddCourseVisible(!props.addCourseVisible)}
        />
      </View>
    </View>
  );
}
