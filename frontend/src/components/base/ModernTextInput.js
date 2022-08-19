import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import CustomText from "./CustomText";
import { AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    props.touchedDateField()
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("MM-DD-YYYY");
    props.setDateField(formattedDate)
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleTextInput = () => {
    if (props.selector) {
      return (
        <RNPickerSelect
          {...props}
          onOpen={props.onPressIn}
          onValueChange={props.onChangeText}
          Icon={() => {
            return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
          }}
          style={{
            inputIOS: {
              padding: 5,
              fontSize: 18,
              fontFamily: AppFonts.SFRegular,
            },
            inputIOSContainer: {
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: props.borderColor ? props.borderColor : "grey",
              alignItems: "center",
            },
            iconContainer: {
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10,
              height: "100%",
            },
            placeholder: { color: "black" },
          }}
        />
      );
    } else if (props.bottomSheet) {
      return <BottomSheetTextInput style={styles.textInput} {...props} />;
    } else if (props.date) {
      return (
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            isDarkModeEnabled={false}
            textColor='black'
      
          />
          <TextInput {...props} style={styles.textInput} />
        </TouchableWithoutFeedback>
      );
    } else {
      return <TextInput style={styles.textInput} {...props} />;
    }
  };
  return (
    <View
      style={{
        width: props.width ? props.width : BaseAppDimensions.screenWidth / 1.1,
        margin: 10,
        alignSelf: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <CustomText size="s" color="grey">
          {props.label}
        </CustomText>
        {props.required ? (
          <CustomText size="xs" color="red">
            {" "}
            *
          </CustomText>
        ) : null}
      </View>
      {handleTextInput()}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CustomText error>{props.error}</CustomText>
      </View>
    </View>
  );
};

export default ModernTextInput;
