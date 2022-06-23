import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import styles from "./styles";
import moment from "moment";
import ExpandableListItem from "../base/ExpandableListItem";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

export default function Assignments(props) {
  const handleAssignmentListEmpty = () => {
    return <Text style={styles.courseTitle}>No Assignments</Text>;
  };
  const getDate = (date) => {
    const newDate = moment(date).format("MMM Do YYYY");
    return newDate;
  };

  const formatSubtitle = (item) => {
    return <Text>Due: {getDate(item.due_date)}</Text>;
  };

  const RenderRight = (progress, dragx) => {
    const scale = dragx.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: "clamp",
    });

    return (
      <>
        <TouchableOpacity onPress={() => alert("Delete Pressed")}>
          <View style={{ ...styles.swipeableIconContainer, backgroundColor: "red" }}>
            <Animated.View
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "400",
                transform: [{ scale }],
              }}
            >
              <Icon name="trash" type="ionicon" size={50} color="white" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const RenderLeft = (progress, dragx) => {
    const scale = dragx.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <>
        <TouchableOpacity onPress={() => alert("Complete Pressed")}>
          <View style={{ ...styles.swipeableIconContainer, backgroundColor: "green" }}>
            <Animated.View
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "400",
                transform: [{ scale }],
              }}
            >
              <Icon name="checkmark" type="ionicon" size={40} color="white" />
            </Animated.View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Add Pressed")}>
          <View style={{ ...styles.swipeableIconContainer, backgroundColor: "blue" }}>
            <Animated.View
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "400",
                transform: [{ scale }],
              }}
            >
              <Icon name="md-add" type="ionicon" size={40} color="white" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <FlatList
      data={props.courseSpecficAssignments}
      ListEmptyComponent={handleAssignmentListEmpty}
      contentContainerStyle={{ alignItems: "center" }}
      renderItem={({ item }) => {
        return (
          <GestureHandlerRootView>
            <Swipeable
              renderRightActions={RenderRight}
              renderLeftActions={RenderLeft}
              overshootRight={false}
              overshootLeft={false}
              friction={2}
              useNativeAnimations
            >
              <ExpandableListItem
                id={item.id}
                leadingIcon={true}
                leadingIconName={"circle"}
                leadingIconType={"material-community"}
                leadingIconColor={props.color}
                title={item.name}
                description={item.description}
                subtitle={formatSubtitle(item)}
                subtitleColor={"red"}
                maxPoints={item.max_points}
              />
            </Swipeable>
          </GestureHandlerRootView>
        );
      }}
    />
  );
}
