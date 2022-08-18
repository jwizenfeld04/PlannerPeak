import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { updateUserCourse } from "../../redux/features/course/courseSlice";
import { useDispatch } from "react-redux";
import { AppColors } from "../../styles/globalStyles";
import AddCourseForm from "./AddCourseForm";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const EditCourseSheet = (props) => {
  const dispatch = useDispatch();
  const [sheetIndex, setSheetIndex] = useState(-1);
  const snapPoints = useMemo(() => ["65%"], []);
  const bottomSheetRef = useRef();
  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(0);
  const handleClosePress = () => {
    bottomSheetRef.current.close();
    bottomSheetRef.current.forceClose();
  };

  const onSubmit = (courseData) => {
    courseData.id = props.course.id;
    dispatch(updateUserCourse(courseData));
    props.setModalData({
      name: courseData.name,
      subject: courseData.subject,
      color: courseData.color,
    });
    props.onCreateModalBack();
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
      <AddCourseForm
        edit
        course={props.course}
        onSubmit={onSubmit}
        handleOpenPress={handleOpenPress}
        bottomSheetIndex={sheetIndex}
        handleClosePress={handleClosePress}
      />
    </BottomSheet>
  );
};

export default EditCourseSheet;
