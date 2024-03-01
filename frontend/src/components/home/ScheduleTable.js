import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { BaseAppDimensions } from "../../styles/globalStyles";
import ScheduleBlock from "./ScheduleBlock";

export default function ScheduleTable(props) {
  const handleEmptySchedule = (schedule) => {
    schedule.some((element, index) =>
      element.dueDate === props.selectedDate ? true : false
    );
  };

  const scheduleBlocks = [
    {
      id: "1",
      name: "Integrals HW",
      scheduledStart: "9:30",
      scheduledFinish: "10:20",
      color: "green",
      day: "2023-02-09", // Date must be in the following format: YYYY-MM-DD
      dueDate: "11/2/22", // This is the format actually displayed in the app
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
    {
      id: "2",
      name: "History Essay",
      scheduledStart: "11:30",
      scheduledFinish: "12:20",
      color: "red",
      day: "2023-02-09",
      dueDate: "9/19/22",
      description:
        "This is the descripiton of the assingment abbreviated dajndnkjadn awflnjdandkawdjknwajkdnwakjnd",
    },
    {
      id: "3",
      name: "English Test",
      scheduledStart: "1:30",
      scheduledFinish: "2:20",
      color: "blue",
      dueDate: "9/18/22",
      day: "2023-02-09",
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
      day: "2023-02-09",
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
        })
        }
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
