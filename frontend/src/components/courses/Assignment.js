import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import styles from "./styles";
import moment from "moment";
import ExpandableListItem from "../base/ExpandableListItem";

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

  return (
    <FlatList
      data={props.courseSpecficAssignments}
      ListEmptyComponent={handleAssignmentListEmpty}
      contentContainerStyle={{ alignItems: "center" }}
      renderItem={({ item }) => {
        return (
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
        );
      }}
    />
  );
}
