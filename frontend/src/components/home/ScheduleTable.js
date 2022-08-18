import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { BaseAppDimensions } from "../../styles/globalStyles";
import ScheduleBlock from "./ScheduleBlock";

export default function ScheduleTable(props) {
  const scheduleBlocks = [
    {
      id: "1",
      name: "Integrals HW",
      scheduledStart: "9:30",
      scheduledFinish: "10:20",
      color: "green",
      day: "2022-08-17",
      dueDate: "8/17/22",
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
    {
      id: "2",
      name: "History Essay",
      scheduledStart: "11:30",
      scheduledFinish: "12:20",
      color: "red",
      day: "2022-08-17",
      dueDate: "8/17/22",
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
    {
      id: "3",
      name: "English Test",
      scheduledStart: "1:30",
      scheduledFinish: "2:20",
      color: "blue",
      dueDate: "8/17/22",
      day: "2022-08-17",
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
    {
      id: "4",
      name: "Study for Math Test",
      scheduledStart: "3:30",
      scheduledFinish: "4:20",
      color: "green",
      dueDate: "8/17/22",
      day: "2022-08-18",
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        {scheduleBlocks.map((obj, index) => {
          if (obj.day === props.selectedDate) {
            return (
              <View key={index}>
                <ScheduleBlock
                  name={obj.name}
                  color={obj.color}
                  scheduledStart={obj.scheduledStart}
                  scheduledFinish={obj.scheduledFinish}
                  description={obj.description}
                  dueDate={obj.dueDate}
                />
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BaseAppDimensions.screenWidth / 1.1,
    alignSelf: "center",
    padding: 5,
    flexDirection: "row",
    height: BaseAppDimensions.screenHeight / 2.05,
  },
});
