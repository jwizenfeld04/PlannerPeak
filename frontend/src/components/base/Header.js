import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import CustomIcon from "../base/Icon";
import SaveButton from "./SaveButton";
import styles from "./styles";

export default function Header(props) {
  const backButton = () => {
    return (
      <TouchableOpacity
        onPress={props.onBackButtonPress}
        style={{
          justifyContent: "center",
          zIndex: 1, // zIndex is needed to render the button above the text due to absolute position
        }}
      >
        <Ionicons name="chevron-back-sharp" size={28} color={props.iconColor} />
      </TouchableOpacity>
    );
  };

  const icons = () => {
    if (props.iconName1 && props.iconName2) {
      return (
        <View style={styles.iconContainer}>
          <CustomIcon
            name={props.iconName1}
            type={props.iconType1}
            onPress={props.onIconPress1}
            color={props.iconColor}
          />
          <CustomIcon
            name={props.iconName2}
            type={props.iconType2}
            onPress={props.onIconPress2}
            color={props.iconColor}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.iconContainer}>
          <CustomIcon
            name={props.iconName1}
            type={props.iconType1}
            onPress={props.onIconPress1}
            color={props.iconColor}
          />
        </View>
      );
    }
  };

  const leftPaddingHeader = () => {
    if (props.titleAlign === "flex-start" && props.backButton) {
      return 35;
    } else if (props.titleAlign === "flex-start") {
      return 15;
    } else {
      return 0;
    }
  };

  const rightPaddingHeader = () => {
    if (props.titleAlign === "flex-end" && props.iconName1 && props.iconName2) {
      return 78;
    } else if (props.titleAlign === "flex-end" && props.iconName1) {
      return 50;
    } else if (props.titleAlign === "flex-end") {
      return 15;
    } else {
      return 0;
    }
  };

  return (
    <View
      style={{
        height: AppDimensions.headerHeight,
        backgroundColor: props.backgroundColor,
        borderBottomColor: props.borderBottomColor,
        borderBottomWidth: 1.5,
        width: BaseAppDimensions.screenWidth,
        flexDirection: "row",
      }}
    >
      {props.backButton ? backButton() : null}

      <View
        style={{
          justifyContent: "center",
          alignItems: props.titleAlign,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: leftPaddingHeader(),
          paddingRight: rightPaddingHeader(),
          marginLeft:
            props.titleAlign === "center"
              ? BaseAppDimensions.screenWidth / 6
              : 0,
          marginRight:
            props.titleAlign === "center"
              ? BaseAppDimensions.screenWidth / 6
              : 0,
        }}
      >
        <Text
          style={{
            fontSize: 36,
            color: props.titleColor,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.title}
        </Text>
      </View>
      {props.icons ? icons() : null}
      {props.saveButton ? <SaveButton onPress={props.onSavePress} /> : null}
    </View>
  );
}
