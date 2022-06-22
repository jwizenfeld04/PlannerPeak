import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function CancelDeleteButton(props) {
  return (
    <View
      style={{
        paddingTop: 15,
        paddingRight:15,

      }}
    >
      <TouchableOpacity
        onPress={() => props.onPress(false)}
      >
        <Text
          style={{
            fontSize: 14,
            color: AppColors.primaryBackgroundColor,
            fontFamily: AppFonts.primaryText,
          }}
        >
         Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
