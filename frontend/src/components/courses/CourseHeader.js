import React, { useState, useEffect, Fragment } from "react";
import {
  SafeAreaView,
  Text,
  ActionSheetIOS,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import { AppFonts } from "../../styles/globalStyles";
import TouchableIcon from "../base/TouchableIcon";

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
      <Text
        style={{
          color: "black",
          fontSize: 24,
          fontFamily: AppFonts.SFBOLD,
        }}
      >
        Courses
      </Text>
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
          onPress={() => props.setCreateModalVisible(true)}
        />
      </View>
    </View>
  );
}
