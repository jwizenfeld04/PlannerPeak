import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AppColors } from "../../styles/globalStyles";
import CustomText from "./CustomText";

export default function DeleteButton(props) {
  return (
    <View
      style={{
        marginBottom: 12,
        paddingLeft: 20,
      }}
    >
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.selectedCount === 0 ? true : false}
      >
        <CustomText
          size="l"
          font="bold"
          color={props.selectedCount === 0 ? "black" : AppColors.errorColor}
        >
          {`Delete (${props.selectedCount})`}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
