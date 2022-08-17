import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function DeleteButton(props) {
  return (
    <View
      style={{
        marginBottom:12,
        paddingLeft: 20,
      }}
    >
      <TouchableOpacity onPress={props.onPress} disabled={props.selectedCount === 0 ? true : false}>
        <Text
          style={{
            fontSize: 20,
            color: props.selectedCount === 0 ? "black" : AppColors.errorColor,
            fontFamily: AppFonts.SFBOLD,
          }}
        >
          Delete ({props.selectedCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
