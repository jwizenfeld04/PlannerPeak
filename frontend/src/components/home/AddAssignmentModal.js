import React, { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import AddAssignmentForm from "./AddAssignmentForm";

export default function AddAssignmentModal(props) {
  const snapPoints = useMemo(() => ["68%"], []);
  const bottomSheetRef = useRef();
  const [sheetIndex, setSheetIndex] = useState(-1);
  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(0);

  const handleClosePress = () => {
    bottomSheetRef.current.close();
    bottomSheetRef.current.forceClose();
  };

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
      onChange={(index) => setSheetIndex(index)}
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
      <AddAssignmentForm
        handleOpenPress={handleOpenPress}
        bottomSheetIndex={sheetIndex}
        handleClosePress={handleClosePress}
        courses={props.courses}
      />
    </BottomSheet>
  );
}
