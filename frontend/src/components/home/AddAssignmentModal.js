import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import Modal from "react-native-modal";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";
import RadioButtonRN from "radio-buttons-react-native";

export default function AddAssignmentModal(props) {
  const snapPoints = useMemo(() => ["58%"], []);
  const bottomSheetRef = useRef();

  const subjects = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Language Arts", value: "Language Arts" },
    { label: "Science", value: "Science" },
    { label: "Social Studies", value: "Social Studies" },
    { label: "Arts", value: "Arts" },
    { label: "Technology", value: "Technology" },
    {
      label: "Health & Physical Education",
      value: "Health & Physical Education",
    },
    { label: "Professional Development", value: "Professional Development" },
    { label: "Other", value: "Other" },
  ];

  const data = [
    {
      label: "15 Min",
    },
    {
      label: "30 Min",
    },
    {
      label: "1 Hr",
    },
  ];

  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(0);

  useEffect(() => {
    handleOpenPress();
  }, [props.visible]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={-1}
      enablePanDownToClose={true}
      handleStyle={{
        backgroundColor: "#F5F5F5",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: "#E8E8E8",
      }}
      backgroundStyle={{
        backgroundColor: "#F5F5F5",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#E8E8E8",
      }}
      handleIndicatorStyle={{ backgroundColor: AppColors.primaryBackgroundColor }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          handleOpenPress();
        }}
      >
        <View style={{ alignItems: "center", flex: 1, padding: 5 }}>
          <Text>Add Assignment</Text>
          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor="black"
          />
          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Description"
            placeholderTextColor="black"
          />
          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Due Date"
            placeholderTextColor="black"
          />
          <RNPickerSelect
            placeholder={{ label: "Course", value: "" }}
            onValueChange={(value) => {}}
            items={subjects} //List of all courses the user has
            Icon={() => {
              return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
            }}
            style={{
              placeholder: {
                color: "black",
              },
              inputIOS: {},
              inputIOSContainer: {
                flexDirection: "row",
                borderWidth: 1,
                alignItems: "center",
                borderRadius: 4,
                backgroundColor: "white",
                width: BaseAppDimensions.screenWidth / 1.3,
                alignSelf: "center",
                marginTop: 10,
                padding: 5,
              },
              iconContainer: {
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
                height: "100%",
              },
            }}
          />
          <RadioButtonRN
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            boxStyle={{
              alignItems: "center",
              width: BaseAppDimensions.screenWidth / 4.2,
              height: BaseAppDimensions.screenWidth / 7,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 4,
              margin: 5,
            }}
            textStyle={{ fontSize: 12, padding: 5 }}
            data={data}
            selectedBtn={(e) => console.log(e.label)}
            circleSize={6}
          />
        </View>
      </TouchableWithoutFeedback>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  headerText: {
    padding: 15,
    paddingLeft: 20,
    fontFamily: AppFonts.SFRegular,
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "white",
    width: BaseAppDimensions.screenWidth / 1.3,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginTop: 10,
  },
});
