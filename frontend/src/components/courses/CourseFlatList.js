import courseScreenStyles from "../../styles/courseScreenStyles";
import SchoologyIcon from "../../assets/images/schoology_icon.png";
import PlannerPeakIcon from "../../assets/images/logo2.png";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import React from "react";
import { AppColors } from "../../styles/globalStyles";

const CourseFlatList = (props) => {
  return (
    <View style={{ height: 675 }}>
      <FlatList
        onRefresh={props.onRefresh}
        refreshing={props.isRefreshing}
        data={props.courses}
        // missing item key - possibly uses db id instead solution would be keyExtractorgit
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => {
          return (
            <ListItem
              key={item.id}
              onPress={() => {
                props.onCoursePress(item);
              }}
              bottomDivider
              containerStyle={courseScreenStyles.courseView}
              underlayColor={AppColors.primaryBackgroundColor}
            >
              <Icon
                name="circle"
                type="material-community"
                color={item.color}
                size={17}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle
                  style={{ fontSize: 12, marginTop: 5, fontStyle: "italic" }}
                >
                  {" "}
                  {item.number_of_assignments}
                </ListItem.Subtitle>
              </ListItem.Content>
              {item.is_schoology ? (
                <Avatar source={SchoologyIcon} size={40} />
              ) : (
                <Avatar source={PlannerPeakIcon} size={40} />
              )}
            </ListItem>
          );
        }}
      />
    </View>
  );
};

export default CourseFlatList;
