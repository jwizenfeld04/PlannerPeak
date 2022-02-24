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
  return (
    <View style={{ height: 675 }}>
      <FlatList
        onRefresh={props.onRefresh}
        refreshing={props.isRefreshing}
        data={props.courses}
        contentContainerStyle={courseScreenStyles.flatList}
        // missing item key - possibly uses db id instead solution would be keyExtractorgit
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.onCoursePress(item);
              }}
            >
              <View style={courseScreenStyles.courseView}>
                <View style={{ width: 300 }}>
                  <ListItem.Title style={courseScreenStyles.courseTitle}>
                    {item.name}
                  </ListItem.Title>
                </View>
                  {item.is_schoology ? (
                    <Image
                      source={SchoologyIcon}
                      style={courseScreenStyles.courseIcon}
                    />
                  ) : (
                    <Image
                      source={PlannerPeakIcon}
                      style={courseScreenStyles.courseIcon}
                    />
                  )}
                </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CourseFlatList;
