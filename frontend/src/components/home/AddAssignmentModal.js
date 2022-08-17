import React, { Component, Fragment, useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  AppColors,
  AppDimensions,
  AppFonts,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import Modal from "react-native-modal";
import BottomSheet, { BottomSheetView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";

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

  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(0);

  useEffect(() => {
    handleOpenPress();
  }, [props.visible]);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
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
          <RNPickerSelect
            placeholder={{ label: "Course", value: "" }}
            onValueChange={(value) => {
            }}
            items={subjects} //List of all courses the user has
            Icon={() => {
              return <Icon name="chevron-down-outline" type="ionicon" color="grey" />;
            }}
            style={{
              placeholder: {
                color: "black",
              },
              inputIOS: {
              },
              inputIOSContainer: {
                flexDirection: "row",
                borderWidth: 1,
                alignItems: "center",
                borderRadius: 4,
                backgroundColor: "white",
                width: BaseAppDimensions.screenWidth / 1.5,
                alignSelf: "center",
                marginTop: 10,
                padding:5
              },
              iconContainer: {
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
                height: "100%",
              },
            }}
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
    width: BaseAppDimensions.screenWidth / 1.5,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginTop: 10,
  },
});
