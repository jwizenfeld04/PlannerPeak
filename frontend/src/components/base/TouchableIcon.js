import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import { Icon } from "react-native-elements";

export default function TouchableIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.name}
        type={props.type}
        size={28}
        color={props.color}
        style={{...props.style}}
      />
    </TouchableOpacity>
  );
}
