import courseScreenStyles from "../../styles/courseScreenStyles";
import { Ionicons } from "@expo/vector-icons";
import PriorityBoxes from "./prefrences/PriorityBoxes";
import ColorRadioButtons from "./prefrences/ColorRadioButtons";
import NotificationCheckBox from "./prefrences/NotificationCheckBox";
import { ListItem } from "react-native-elements";
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AppColors } from "../../styles/globalStyles";
import { Button } from "react-native-elements/dist/buttons/Button";
import GradeTimeChart from "./GradeTimeChart";

const CourseModal = (props) => {
  const [courseNotifications, setCourseNotifications] = useState(
    props.modalData.notifications
  );
  const [checkedColor, setCheckedColor] = useState(props.modalData.color);

  const handleAssignmentListEmpty = () => {
    return <Text style={courseScreenStyles.courseTitle}>No Assignments</Text>;
  };

  const handleModalNameColor = () => {
    if (props.modalData.color) {
      return `${props.modalData.color}`;
    } else {
      return "black";
    }
  };


  useEffect(() => {
    setCourseNotifications(props.modalData.notifications);
    setCheckedColor(props.modalData.color);
    props.getAverageMinutes();
  }, [props.modalData]);

  const styles2 = StyleSheet.create({
    courseModalName: {
      fontSize: 30,
      textAlign: "center",
      justifyContent: "center",
      color: handleModalNameColor(),
    },
    courseTitle: {
      fontSize: 20,
      color: "black",
      justifyContent: "center",
    },
    flatList: {
      justifyContent: "center",
      alignItems: "center",
    },
    courseIcon: {
      width: "13%",
      height: "100%",
      marginRight: 10,
    },
    courseHeaderTitle: {
      fontSize: 40,
      color: "black",
      textAlign: "center",
      marginBottom: 10,
    },
  });

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={false}
      onDismiss={props.onModalDismiss}
    >
      <SafeAreaView
        style={{ backgroundColor: AppColors.primaryBackgroundColor, flex: 1 }}
      >
        <View style={{ flexDirection: "row", paddingBottom: 50 }}>
          <TouchableOpacity onPress={props.onModalBack}>
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>{props.modalData.name}</Text>
        </View>
        <GradeTimeChart />
       {props.avgMinutes ? <Text>Average Assignment Minutes: {props.avgMinutes}</Text> : <Text> No Average Assignment Minutes</Text>}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 3,
              backgroundColor: AppColors.primaryAccentColor,
            }}
          />
          <View>
            <Text
              style={{
                width: 120,
                textAlign: "center",
                color: AppColors.primaryAccentColor,
                fontSize:20
              }}
            >
              Prefrences
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 3,
              backgroundColor: AppColors.primaryAccentColor,
            }}
          />
        </View>
        <ColorRadioButtons
          checkedColor={checkedColor}
          onPress={props.onRadioPress}
        />
        <PriorityBoxes
          priority={props.modalData.priority}
          onPress={props.onPriorityPress}
        />
        <NotificationCheckBox
          courseNotifications={courseNotifications}
          onPress={props.onCheckmarkPress}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default CourseModal;
