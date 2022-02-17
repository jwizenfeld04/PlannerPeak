import courseScreenStyles from "../../styles/courseScreenStyles";
import SchoologyIcon from "../../assets/images/schoology_icon.png";
import PlannerPeakIcon from "../../assets/images/planner_peak_logo.png";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import React from "react";

const CourseFlatList = (props) => {
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

  const styles = (color) =>
    StyleSheet.create({
      courseView: {
        backgroundColor: color,
        borderWidth: 0,
        borderRadius: 10,
        width: 350,
        height: 45,
        marginBottom: 12,
        marginTop: 12,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowOffset: { height: 3, width: -3 },
        shadowColor: color,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        flexDirection: "row",
      },
    });

  return (
    <View style={{ height: 675 }}>
      <Text style={styles2.courseHeaderTitle}>My Courses</Text>
      <FlatList
        onRefresh={props.onRefresh}
        refreshing={props.isRefreshing}
        data={props.courses}
        contentContainerStyle={styles2.flatList}
        // missing item key - possibly uses db id instead solution would be keyExtractorgit
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.onCoursePress(item);
              }}
            >
              <View style={styles(item.color).courseView}>
                {item.is_schoology ? (
                  <Image source={SchoologyIcon} style={styles2.courseIcon} />
                ) : (
                  <Image source={PlannerPeakIcon} style={styles2.courseIcon} />
                )}
                <ListItem.Title style={styles2.courseTitle}>
                  {item.name}
                </ListItem.Title>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CourseFlatList;
