import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AppColors } from "../../styles/globalStyles";
import CustomText from "./CustomText";

export default function CancelDeleteButton(props) {
  return (
    <View
      style={{
        paddingRight: 20,
      }}
    >
      <TouchableOpacity onPress={() => props.onPress(false)}>
        <CustomText size="l" color={AppColors.primaryBackgroundColor}>
          Cancel
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
