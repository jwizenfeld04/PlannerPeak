import React from "react";
import { Text, View, StyleSheet} from 'react-native';

const CurrentAssignment = (props) => {

    return (
      <View style={styles.currentAssignmentView}>
        {props.currentAssignment ? (
          <View>
            <Text style={styles.currentAssignmentText}>
              {props.currentAssignment.name}
            </Text>
            {props.remainingTime !== 0 ? (
              <Text>{props.remainingTime} minutes left</Text>
            ) : (
              <Text></Text>
            )}
          </View>
        ) : (
          <View>
            <Text>No current assignment </Text>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      borderColor: "black",
      borderWidth: 2,
    },
    currentAssignmentView: {
      paddingTop: 20,
    },
    currentAssignmentText: {
      borderColor: "black",
      borderWidth: 2,
      fontSize: 20,
    },
  }); 

  export default CurrentAssignment;