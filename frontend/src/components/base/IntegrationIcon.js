import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
  AppImages,
} from "../../styles/globalStyles";

export default function IntegrationIcon(props) {
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          borderWidth: 1.5,
          backgroundColor: "white",
          width: AppDimensions.integrationIcon,
          height: AppDimensions.integrationIcon,
          borderColor: props.isAuth
            ? AppColors.successColor
            : "lightgrey",
          borderRadius: 40,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          {props.isAuth ? (
            <Ionicons
              name="checkmark-outline"
              size={AppDimensions.integrationIcon / 4}
              color="white"
              style={{
                borderWidth: 0.5,
                borderRadius: 9,
                borderColor: AppColors.successColor,
                backgroundColor: AppColors.successColor,
                overflow: "hidden",
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <ImageBackground
            source={props.icon}
            style={{
              height: AppDimensions.integrationIcon / 1.3,
              width: AppDimensions.integrationIcon / 1.3,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
