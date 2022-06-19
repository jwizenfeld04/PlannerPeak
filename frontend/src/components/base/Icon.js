import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import { Icon } from "react-native-elements";

export default function CustomIcon(props) {
  return (
    <TouchableOpacity style={{paddingRight:15}} onPress={props.onPress}>
      <Icon
        name={props.name}
        type={props.type}
        size={28}
        color={props.color}
      />
    </TouchableOpacity>
  );
}
