import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  cloneElement,
} from "react";
import { AppColors } from "../../styles/globalStyles";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBottomSheet = (props) => {
  const [sheetIndex, setSheetIndex] = useState(-1);
  const snapPoints = useMemo(() => props.snapPoints, []);
  const bottomSheetRef = useRef();
  const handleOpenPress = () => {
    bottomSheetRef.current.snapToIndex(0);
    if (props.openPress) {
      props.handleOpenPress();
    }
  };
  const handleClosePress = () => {
    bottomSheetRef.current.close();
    bottomSheetRef.current.forceClose();
  };

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

  useEffect(() => {
    handleOpenPress();
  }, [props.visible]);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={renderBackdrop}
      onChange={(index) => setSheetIndex(index)}
      onClose={() => {
        if (props.closePress) {
          props.handleClosePress();
        }
      }}
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
      {props.children
        ? cloneElement(props.children, {
            handleOpen: handleOpenPress,
            bottomSheetIndex: sheetIndex,
            handleClose: handleClosePress,
          })
        : null}
    </BottomSheet>
  );
};

export default CustomBottomSheet;
