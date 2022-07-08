import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function CustomButton(props) {
  return (
    <View style={{ alignItems: "center", padding: 5, flex:1, ...props.styles }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{ ...styles.buttonContainer, width: props.width }}
        disabled={props.disabled}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
