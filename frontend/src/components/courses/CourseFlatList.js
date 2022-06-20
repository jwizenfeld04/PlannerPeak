import courseScreenStyles from "../../styles/courseScreenStyles";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextPropTypes,
  Platform
} from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import React, { useState } from "react";
import {
  AppColors,
  AppImages,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import { Button ,Menu, Divider, Provider } from "react-native-paper";

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
            <ListItem
              key={item.id}
              onPress={() => {
                props.onCoursePress(item);
              }}
              onLongPress={() => {
                console.log('edit')
              }}
              bottomDivider
              containerStyle={courseScreenStyles.courseView}
              underlayColor="#fff"
            >
              <Icon
                name="circle"
                type="material-community"
                color={item.color}
                size={17}
              />

              <ListItem.Content>
                <ListItem.Title
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ width: BaseAppDimensions.screenWidth / 1.9 }}
                >
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{ fontSize: 12, marginTop: 5, fontStyle: "italic" }}
                >
                  {handleAssignment(item)}
                </ListItem.Subtitle>
              </ListItem.Content>
              {item.grade ? (
                <Text style={{ color: item.color }}>{item.grade}%</Text>
              ) : (
                <Text style={{ color: item.color }}>N/A</Text>
              )}

              {item.is_schoology ? (
                <Avatar source={AppImages.schoologyIcon} size={40} />
              ) : (
                <Avatar source={AppImages.plannerPeakIcon} size={40} />
              )}
            </ListItem>
          );
        }}
      />
    </View>
  );
};

export default CourseFlatList;
