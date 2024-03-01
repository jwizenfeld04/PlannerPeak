import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function TouchableIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.name}
        type={props.type}
        size={props.size ? props.size : 28}
        color={props.color}
        style={{ ...props.style }}
      />
    </TouchableOpacity>
  );
}
