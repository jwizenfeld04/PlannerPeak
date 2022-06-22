import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextPropTypes,
  Platform,
} from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import React, { useState } from "react";
import {
  AppColors,
  AppImages,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import CustomListItem from "../base/ListItem";

const CourseFlatList = (props) => {
  let courses = [...props.courses];
  const sort = props.sort;
  const compare_course = (a, b) => {
    //Sorts from highest to lowest
    if (a[sort] > b[sort]) {
      return -1;
    }
    if (a[sort] < b[sort]) {
      return 1;
    }
    return 0;
  };

  const handleAssignment = (course) => {
    if (course.number_of_assignments === 0) {
      return "No Assignments";
    } else if (course.number_of_assignments === 1) {
      return "1 Assignment";
    } else {
      return `${course.number_of_assignments} Assignments`;
    }
  };

  return (
    <View style={{ height: AppDimensions.mainViewHeight }}>
      <FlatList
        data={courses.sort(compare_course)}
        onRefresh={props.onRefresh}
        refreshing={props.isRefreshing}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => {
          return (
            <CustomListItem
              id={item.id}
              onPress={() => {
                props.onCoursePress(item);
              }}
              onLongPress={() => {}}
              leadingIcon={true}
              leadingIconName={"circle"}
              leadingIconType={"material-community"}
              leadingIconColor={item.color}
              title={item.name}
              subtitle={handleAssignment(item)}
              showGrade={true}
              grade={item.grade}
              trailingIcon={true}
              trailingIconAvatar={item.is_schoology}
            />
          );
        }}
      />
    </View>
  );
};

export default CourseFlatList;
