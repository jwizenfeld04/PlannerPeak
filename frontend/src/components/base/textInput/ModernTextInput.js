import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AppFonts, BaseAppDimensions } from "../../../styles/globalStyles";
import RNPickerSelect from "react-native-picker-select";

const ModernTextInput = (props) => {
  const handleTextInput = () => {
    if (props.selector) {
      return (
        <RNPickerSelect
          {...props}
          onOpen={props.onPressIn}
          onValueChange={props.onChangeText}
          style={{
            inputIOS: {
              padding: 5,
              fontSize: 18,
              fontFamily:AppFonts.SFRegular
            },
            inputIOSContainer: {
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: props.borderColor,
              alignItems: "center",
            },
            iconContainer: {
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10,
              height: "100%",
            },
          }}
        />
      );
    } else {
      return (
        <TextInput
          style={{
            padding: 5,
            fontSize: 18,
            fontFamily: AppFonts.SFRegular,
            borderBottomWidth: 1,
            borderBottomColor: props.borderColor ? props.borderColor : "grey",
          }}
          {...props}
        />
      );
    }
  };
  return (
    <View
      style={{
        width: BaseAppDimensions.screenWidth / 1.1,
        margin: 10,
        alignSelf: "center",
      }}
    >
      <View>
        <Text style={{ color: "grey", fontFamily: AppFonts.SFRegular, fontSize: 14 }}>
          {props.label}
        </Text>
      </View>
      {handleTextInput()}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginTop: 6,
            color: "red",
            fontSize: 10,
            fontFamily: AppFonts.SFRegular,
          }}
        >
          {props.error}
        </Text>
      </View>
    </View>
  );
};

export default ModernTextInput;
