import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { AppColors } from "../../styles/globalStyles";
import courseScreenStyles from "../../styles/courseScreenStyles";
import moment from 'moment';

export default function Assignments(props) {
  const handleAssignmentListEmpty = () => {
    return <Text style={courseScreenStyles.courseTitle}>No Assignments</Text>;
  };
  const getDate = (date) => {
      const newDate = moment(date).format("MMM Do YYYY");
    return newDate;
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
            <ListItem
              key={item.id}
              onPress={() => {}}
              bottomDivider
              containerStyle={styles.courseView}
              underlayColor={AppColors.primaryBackgroundColor}
            >
              <Icon
                name="circle"
                type="material-community"
                color={props.color}
                size={17}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle
                  style={{ fontSize: 12, marginTop: 5, fontStyle: "italic", color:'red' }}
                >
                  <Text>Due: {getDate(item.due_date)}</Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseView: {
    backgroundColor: "#B7D7EA",
    marginBottom: 20,
    width: 350,
    borderWidth: 0,
    borderRadius: 16,
    shadowOffset: { height: 2, width: -2 },
    shadowColor: "#B7D7EA",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
