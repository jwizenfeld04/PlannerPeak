import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function CancelDeleteButton(props) {
  return (
    <View
      style={{
        paddingRight:20,
      }}
    >
      <TouchableOpacity
        onPress={() => props.onPress(false)}
      >
        <Text
          style={{
            fontSize: 20,
            color: AppColors.primaryBackgroundColor,
            fontFamily: AppFonts.SFRegular,
          }}
        >
         Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
