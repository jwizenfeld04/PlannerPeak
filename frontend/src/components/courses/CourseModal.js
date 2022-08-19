import React, { useState } from "react";
import { SafeAreaView, Modal, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";

import Analytics from "./Analytics";
import Assignments from "./Assignment";
import CustomText from "../base/CustomText";
import TouchableIcon from "../base/TouchableIcon";
import AddEditCourseForm from "./AddEditCourseForm";
import CustomBottomSheet from "../base/CustomBottomSheet";

import { AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import {
  completeAssignment,
  deleteAssignment,
} from "../../redux/features/assignment/assignmentSlice";
import { updateUserCourse } from "../../redux/features/course/courseSlice";

const CourseModal = (props) => {
  const [tab, setTab] = useState("Assignments");
  const [editSheetVisible, setEditSheetVisible] = useState(false);
  const dispatch = useDispatch();

  const handleMainViewDiplay = () => {
    if (tab === "Assignments") {
      return (
        <Assignments
          color={props.modalData.color}
          courseSpecficAssignments={props.courseSpecficAssignments}
          onDeletePress={handleAssignmentDelete}
          onCompletePress={handleAssignmentComplete}
        />
      );
    } else {
      return <Analytics avgMinutes={props.modalData.avgAssignmentMinutes} />;
    }
  };

  const handleAssignmentDelete = (id, name) => {
    Alert.alert("Delete Assignment", `Press "Confirm" to delete ${name}`, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          dispatch(deleteAssignment({ id: id }));
        },
      },
    ]);
  };

  const handleAssignmentComplete = (id) => {
    dispatch(completeAssignment({ id: id }));
  };

  const onEditCourseSubmit = (courseData) => {
    courseData.id = props.modalData.id;
    dispatch(updateUserCourse(courseData));
    props.setModalData({
      name: courseData.name,
      subject: courseData.subject,
      color: courseData.color,
    });
    setEditSheetVisible(false);
  };

  return (
    <Modal animationType="slide" visible={props.modalVisible} transparent={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "row",
          }}
        >
          <TouchableIcon
            name="arrow-back-outline"
            type="ionicon"
            color={props.modalData.color}
            onPress={() => {
              props.onModalDismiss();
            }}
          />
          <TouchableIcon
            name="edit"
            color={props.modalData.color}
            type="material-icon"
            onPress={() => {
              setEditSheetVisible(!editSheetVisible);
            }}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <CustomText
            text={props.modalData.name}
            size="xl"
            font="bold"
            styles={{ textAlign: "center" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 20,
              padding: 5,
              width: BaseAppDimensions.screenWidth / 3,
              alignItems: "center",
              backgroundColor:
                tab === "Assignments" ? AppColors.primaryAccentColor : "#F5F5F5",
            }}
            onPress={() => setTab("Assignments")}
          >
            <CustomText text="Assignments" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 20,
              padding: 5,
              width: BaseAppDimensions.screenWidth / 3,
              alignItems: "center",
              backgroundColor:
                tab === "Analytics" ? AppColors.primaryAccentColor : "#F5F5F5",
            }}
            onPress={() => setTab("Analytics")}
          >
            <CustomText text="Analytics" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {handleMainViewDiplay()}
        </View>
        <CustomBottomSheet visible={editSheetVisible} snapPoints={["65%"]}>
          <AddEditCourseForm
            edit
            onSubmit={onEditCourseSubmit}
            course={props.modalData}
            setModalData={props.setModalData}
          />
        </CustomBottomSheet>
      </SafeAreaView>
    </Modal>
  );
};

export default CourseModal;
