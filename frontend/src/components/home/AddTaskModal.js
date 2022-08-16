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
} from "react-native";
import { AppColors, AppDimensions, AppFonts } from "../../styles/globalStyles";
import Modal from "react-native-modal";
import BottomSheet, { BottomSheetView,BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function AddTaskModal(props) {
  const snapPoints = useMemo(() => ["58%"], []);
  const bottomSheetRef = useRef();

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
      <View style={{ alignItems: "center", flex: 1, padding:5 }}>
        <Text>Add Task</Text>
      </View>
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
});
