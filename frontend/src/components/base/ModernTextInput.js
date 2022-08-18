import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import RNPickerSelect from "react-native-picker-select";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import CustomText from "./CustomText";

const ModernTextInput = (props) => {
  const styles = StyleSheet.create({
    textInput: {
      padding: 5,
      fontSize: 18,
      fontFamily: AppFonts.SFRegular,
      borderBottomWidth: 1,
      borderBottomColor: props.borderColor ? props.borderColor : "grey",
    },
  });
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
              fontFamily: AppFonts.SFRegular,
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
    } else if (props.bottomSheet) {
      return <BottomSheetTextInput style={styles.textInput} {...props} />;
    } else {
      return <TextInput style={styles.textInput} {...props} />;
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
        <CustomText text={props.label} size="s" color="grey" />
      </View>
      {handleTextInput()}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CustomText text={props.error} error />
      </View>
    </View>
  );
};

export default ModernTextInput;
