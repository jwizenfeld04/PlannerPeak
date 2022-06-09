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
import React, { useState, useEffect } from "react";
import { AppColors } from "../../styles/globalStyles";
import Analytics from "./Analytics";
import Assignments from "./Assignment";
import ColorModal from "./ColorModal";

const CourseModal = (props) => {
  const [tab, setTab] = useState("Assignments");
  const [colorSwitch, setColorSwitch] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    props.getAverageMinutes();
  }, [props.modalData]);

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={false}
      onDismiss={props.onModalDismiss}
    >
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
            height: windowHeight / 12,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#2476B1",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.onModalBack();
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Ionicons name="chevron-back-sharp" size={30} />
              <Text style={{ fontSize: 14 }}>Courses</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "black" }}>
              {props.modalData.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setColorSwitch(true);
              }}
            >
              <Ionicons name="color-palette-outline" size={35} />
            </TouchableOpacity>
          </View>
        </View>
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
            paddingTop: 20,
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
