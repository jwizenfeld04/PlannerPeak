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
import React from "react";

const CourseModal = (props) => {
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
      <SafeAreaView>
        <TouchableOpacity onPress={props.onModalBack}>
          <Ionicons name="arrow-back-outline" size={40} color={props.color} />
        </TouchableOpacity>
        <Text style={styles2.courseModalName}>{props.modalData.name}</Text>
        <View>
          <View style={courseScreenStyles.assignmentBorder}>
            <FlatList
              ListEmptyComponent={handleAssignmentListEmpty}
              data={props.courseSpecficAssignments}
              // Missing item key - possibly use course id instead with keyExtractor
              renderItem={({ item }) => {
                return (
                  <View style={courseScreenStyles.courseBorder}>
                    <ListItem.Title style={courseScreenStyles.courseTitle}>
                      {item.name}
                    </ListItem.Title>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <Text style={courseScreenStyles.coursePreferences}>Prefrences</Text>
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
          Color
        </Text>

        <ColorRadioButtons
          checkedColor={props.color}
          onPress={props.onRadioPress}
        />
        <PriorityBoxes
          priority={props.modalData.priority}
          onPress={props.onPriorityPress}
        />
        <NotificationCheckBox
          courseNotifications={props.courseNotifications}
          onPress={props.onCheckmarkPress}
        />
        {props.modalData.notifications ? (
          <Text>Notifications Enabled</Text>
        ) : (
          <Text>Notifications Disabled</Text>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default CourseModal;
