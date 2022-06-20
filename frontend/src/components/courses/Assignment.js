import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { AppColors } from "../../styles/globalStyles";
import styles from "./styles";
import moment from "moment";
import CustomListItem from "../base/ListItem";

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
    <View>
      <FlatList
        data={props.courseSpecficAssignments}
        // missing item key - possibly uses db id instead solution would be keyExtractorgit
        contentContainerStyle={{ alignItems: "center" }}
        ListEmptyComponent={handleAssignmentListEmpty}
        renderItem={({ item }) => {
          return (
            <CustomListItem
              id={item.id}
              onPress={() => {}}
              leadingIcon={true}
              leadingIconName={"circle"}
              leadingIconType={"material-community"}
              leadingIconColor={props.color}
              title={item.name}
              subtitle={formatSubtitle(item)}
              subtitleColor={"red"}
              showGrade={false}
            />
          );
        }}
      />
    </View>
  );
}
