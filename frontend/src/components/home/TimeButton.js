import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { AppColors, AppFonts } from "../../styles/globalStyles";

export default function TimeButton(props) {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        borderRadius: 8,
        backgroundColor: AppColors.primaryAccentColor,
        width:70,
        height:35,
        alignItems:'center',
        justifyContent:'center',
        margin:6
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: 'grey', fontSize:12 }}>{props.title} Min</Text>
    </TouchableOpacity>
  );
}
