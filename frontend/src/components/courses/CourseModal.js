import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, Fragment } from "react";
import { AppColors } from "../../styles/globalStyles";
import Analytics from "./Analytics";
import Assignments from "./Assignment";
import ColorModal from "./ColorModal";
import Header from "../base/Header";
import styles from "./styles";

const CourseModal = (props) => {
  const [tab, setTab] = useState("Assignments");
  const [colorSwitch, setColorSwitch] = useState(false);
  const windowHeight = Dimensions.get("window").height;

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
        <SafeAreaView style={{ flex: 1 }}>
          <ColorModal
            color={props.modalData.color}
            colorSwitch={colorSwitch}
            windowHeight={windowHeight}
            setColorSwitch={setColorSwitch}
            onModalColorChange={props.onModalColorChange}
          />
          <View
            style={{
              height: windowHeight / 20,
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
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            {tab === "Assignments" ? (
              <Assignments
                color={props.modalData.color}
                courseSpecficAssignments={props.courseSpecficAssignments}
              />
            ) : (
              <Analytics avgMinutes={props.avgMinutes} />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

export default CourseModal;
