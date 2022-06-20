import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function SaveButton(props) {
  return (
    <View style={{ ...styles.iconContainer, paddingRight: 15 }}>
      <TouchableOpacity onPress={() => props.onPress(false)}>
        <Text
          style={{
            fontSize: 18,
            color: AppColors.primaryAccentColor,
            fontFamily: AppFonts.primaryText,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
