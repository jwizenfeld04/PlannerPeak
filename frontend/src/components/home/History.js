import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import CustomText from "../base/CustomText";

export default function History(props) {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <CustomText font="bold" size="xl">
          History
        </CustomText>
      </View>
      {props.history ? props.history.map((obj, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.onPress();
              props.setSelectedHistory(obj);
            }}
            key={index}
          >
            <CustomText size="xs">{obj.name}</CustomText>
          </TouchableOpacity>
        );
      }) : null}
    </View>
  );
}
