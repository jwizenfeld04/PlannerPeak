import React, { useState, useEffect, Fragment } from "react";
import { SafeAreaView, Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Analytics from "./Analytics";
import Assignments from "./Assignment";
import ColorModal from "./ColorModal";
import Header from "../base/Header";

import { AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import styles from "./styles";
import {
  completeAssignment,
  deleteAssignment,
} from "../../redux/features/assignment/assignmentSlice";

const CourseModal = (props) => {
  const [tab, setTab] = useState("Assignments");
  const [colorSwitch, setColorSwitch] = useState(false);
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
          dispatch(deleteAssignment({ id: id}));
        },
      },
    ]);
  };

  const handleAssignmentComplete = (id) => {
    dispatch(completeAssignment({ id: id }));
  };

  return (
    <Fragment>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={false}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            title={props.modalData.name} //required
            titleSize={24} //default 36
            backButton={true} // required
            onBackButtonPress={() => {
              props.onModalDismiss();
            }}
            iconColor={AppColors.primaryAccentColor}
            iconName2={"color-palette-outline"}
            iconType2={"ionicon"}
            onIconPress2={() => {
              setColorSwitch(true);
            }}
          />
          <View
            style={{
              height: BaseAppDimensions.screenHeight / 20,
              backgroundColor: "skyblue",
              flexDirection: "row",
            }}
          >
            <View
              style={[
                tab === "Assignments"
                  ? [styles.tabContainer, styles.selectedBottomColor]
                  : styles.tabContainer,
              ]}
            >
              <TouchableOpacity onPress={() => setTab("Assignments")}>
                <Text>Assignments</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                tab === "Analytics"
                  ? [styles.tabContainer, styles.selectedBottomColor]
                  : styles.tabContainer,
              ]}
            >
              <TouchableOpacity onPress={() => setTab("Analytics")}>
                <Text>Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            {handleMainViewDiplay()}
          </View>
          <ColorModal
            color={props.modalData.color}
            colorSwitch={colorSwitch}
            windowHeight={BaseAppDimensions.screenHeight}
            setColorSwitch={setColorSwitch}
            onModalColorChange={props.onModalColorChange}
          />
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

export default CourseModal;
