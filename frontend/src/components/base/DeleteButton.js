import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function DeleteButton(props) {
  return (
    <View
      style={{
        paddingTop: 15,
        paddingLeft: 15,
      }}
    >
      <TouchableOpacity onPress={props.onPress} disabled={props.selectedCount === 0 ? true : false}>
        <Text
          style={{
            fontSize: 14,
            color: props.selectedCount === 0 ? "grey" : AppColors.errorColor,
            fontFamily: AppFonts.primaryText,
          }}
        >
          Delete ({props.selectedCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
