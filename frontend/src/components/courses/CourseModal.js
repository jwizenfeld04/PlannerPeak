import courseScreenStyles from "../../styles/courseScreenStyles";
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
        <SafeAreaView
          style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }}
        />
        <Header
          backgroundColor={AppColors.primaryBackgroundColor}
          borderBottomColor={props.modalData.color}
          title={props.modalData.name} //required
          titleAlign={"center"} //required
          titleColor={AppColors.primaryAccentColor}
          titleSize={24} //default 36
          backButton={true} // required
          onBackButtonPress={()=>{props.onModalBack()}}
          icons={true}
          iconColor={AppColors.primaryAccentColor}
          iconName1={"color-palette-outline"}
          iconType1={"ionicon"}
          onIconPress1={() => {
            setColorSwitch(true);
          }}
        />
        <SafeAreaView style={courseScreenStyles.container}>
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
                  ? styles.selectedBottomColor
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
                  ? styles.selectedBottomColor
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBottomColor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#2476B1",
    borderBottomWidth: 3,
  },
});

export default CourseModal;
