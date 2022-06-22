import React, { useState, useEffect, Fragment } from "react";
import { SafeAreaView, Modal, View, Text, TouchableOpacity } from "react-native";

import Analytics from "./Analytics";
import Assignments from "./Assignment";
import ColorModal from "./ColorModal";
import Header from "../base/Header";

import { AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import styles from "./styles";

const CourseModal = (props) => {
  const [tab, setTab] = useState("Assignments");
  const [colorSwitch, setColorSwitch] = useState(false);

  const handleMainViewDiplay = () => {
    if (tab === "Assignments") {
      return (
        <Assignments
          color={props.modalData.color}
          courseSpecficAssignments={props.courseSpecficAssignments}
        />
      );
    } else {
      return <Analytics avgMinutes={props.avgMinutes} />;
    }
  };

  useEffect(() => {
    props.getAverageMinutes();
  }, [props.modalData]);

  return (
    <Fragment>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={false}
        onDismiss={props.onModalDismiss}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            title={props.modalData.name} //required
            titleSize={24} //default 36
            backButton={true} // required
            onBackButtonPress={() => {
              props.onModalBack();
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
