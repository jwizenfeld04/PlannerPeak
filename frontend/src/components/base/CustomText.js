import React from "react";
import { Text } from "react-native";
import { AppFonts } from "../../styles/globalStyles";

const CustomText = (props) => {
  const handleSize = (size) => {
    if (size === "xs") {
      return 11;
    } else if (size === "s") {
      return 14;
    } else if (size === "m") {
      return 16;
    } else if (size === "l") {
      return 20;
    } else if (size === "xl") {
      return 24;
    } else if (props.error) {
      return 10;
    } else {
      return size;
    }
  };
  const handleFont = (font) => {
    if (font === "bold") {
      return AppFonts.SFBOLD;
    } else if (font === "italic") {
      return AppFonts.SFItalic;
    } else {
      return AppFonts.SFRegular;
    }
  };

  const handleColor = (color) => {
    if (props.error) {
      return "red";
    } else if (color) {
      return color;
    } else {
      return "black";
    }
  };

  return (
    <Text
      style={{
        fontSize: handleSize(props.size),
        fontFamily: handleFont(props.font),
        color: handleColor(props.color),
        marginTop: props.error ? 6 : 0,
        ...props.styles,
      }}
      {...props}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
