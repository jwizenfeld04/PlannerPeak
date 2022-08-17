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
import React, { useState, useEffect } from "react";
import {
  AppColors,
  AppImages,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";
import CustomListItem from "../base/ListItem";
import DeleteButton from "../base/DeleteButton";
import CancelDeleteButton from "../base/CancelDeleteButton";

const DeleteModeFlatList = (props) => {
  let courses = [...props.courses];
  let [selected, setSelected] = useState([]);
  let [selectedCount, setSelectedCount] = useState(0);
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

  const onDeletePress = (item) => {
    if (selected.includes(item.id)) {
      selected = setSelected(selected.filter((id) => id !== item.id));
    } else {
      selected = setSelected([...selected, item.id]);
    }
  };

  useEffect(() => {
    if (selected.length !== 0) {
      setSelectedCount(selected.length);
    } else {
      setSelectedCount(0);
    }
  }, [selected]);

  return (
    <View style={{ height: AppDimensions.mainViewHeight }}>
      <View style={{ flexDirection: "row", justifyContent:'space-between', paddingBottom:10}}>
        <DeleteButton
          onPress={()=>props.onDeletePress(selected)}
          selectedCount={selectedCount}
        />
        <CancelDeleteButton onPress={props.onCancelPress} />
      </View>
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
                onDeletePress(item);
              }}
              leadingIcon={true}
              leadingIconName={
                selected.includes(item.id) ? "close-circle-outline" : "circle-outline"
              }
              leadingIconType={"material-community"}
              leadingIconColor={
                selected.includes(item.id) ? AppColors.errorColor : item.color
              }
              // leadingIconSize={25}
              title={item.name}
              subtitle={handleAssignment(item)}
              trailingIcon={true}
              trailingIconAvatar={item.is_schoology}
            />
          );
        }}
      />
    </View>
  );
};

export default DeleteModeFlatList;
