import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function CustomButton(props) {
  return (
    <View style={{ alignItems: "center", padding: 5 }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{ ...styles.buttonContainer, width: props.width }}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
