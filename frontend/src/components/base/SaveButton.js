import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppColors } from "../../styles/globalStyles";
import styles from "./styles";

export default function SaveButton(props) {
  return (
    <View
      style={styles.iconContainer}
    >
      <TouchableOpacity onPress={() => props.onPress(false)}>
        <Text style={{ fontSize: 18, color: AppColors.primaryAccentColor }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
