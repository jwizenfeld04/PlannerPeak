import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { BaseAppDimensions } from "../../styles/globalStyles";
import CustomText from "./CustomText";

export default function CustomButton(props) {
  return (
    <View style={{ alignItems: "center", padding: 5, ...props.styles }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          ...styles.buttonContainer,
          width: props.width ? props.width : BaseAppDimensions.screenWidth / 3.5,
        }}
        disabled={props.disabled}
      >
        <CustomText
          text={props.title}
          size="s"
          styles={{ textAlign: "center" }}
          color="white"
          font="bold"
        />
      </TouchableOpacity>
    </View>
  );
}
