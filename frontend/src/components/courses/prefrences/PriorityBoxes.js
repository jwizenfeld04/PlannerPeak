import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { AppColors } from "../../../styles/globalStyles";

const PriorityBoxes = (props) => {
  return (
    <View>
      <Text style={{ margin: 10, fontSize: 25 }}>
        Priority: {props.priority}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => {
            props.onPress(1);
          }}
        >
          <Text style={{ fontSize: 22, color: AppColors.primaryAccentColor }}>
            1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => {
            props.onPress(2);
          }}
        >
          <Text style={{ fontSize: 22, color: AppColors.primaryAccentColor }}>
            2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => {
            props.onPress(3);
          }}
        >
          <Text style={{ fontSize: 22, color: AppColors.primaryAccentColor }}>
            3
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PriorityBoxes;
