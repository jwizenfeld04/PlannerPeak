import {
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";
import ExpandableListItem from "../base/ExpandableListItem";
import { BaseAppDimensions } from "../../styles/globalStyles";

export default function Assignments(props) {
  const handleAssignmentListEmpty = () => {
    return (
      <View>
        <Text>No Assignments</Text>
      </View>
    );
  };
  const getDate = (date) => {
    const newDate = moment(date).format("MMM Do YYYY");
    return newDate;
  };

  const formatSubtitle = (item) => {
    return <Text>Due: {getDate(item.due_date)}</Text>;
  };

  const RenderRight = (progress, dragx, id, name) => {
    const scale = dragx.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: "clamp",
    });

    return (
      <>
        <TouchableOpacity onPress={() => props.onDeletePress(id, name)}>
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

  const RenderLeft = (progress, dragx, id) => {
    const scale = dragx.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <>
        <TouchableOpacity onPress={() => props.onCompletePress(id)}>
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
      contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
      renderItem={({ item }) => {
        return (
          <GestureHandlerRootView>
            <Swipeable
              renderRightActions={(progress, dragx) =>
                RenderRight(progress, dragx, item.id, item.name)
              }
              renderLeftActions={(progress, dragx) =>
                RenderLeft(progress, dragx, item.id)
              }
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

const styles = StyleSheet.create({
  swipeableIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
    width: BaseAppDimensions.screenWidth / 6,
    flex: 1,
    shadowOffset: { height: 2, width: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
