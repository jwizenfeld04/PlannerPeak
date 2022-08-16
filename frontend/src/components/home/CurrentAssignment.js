import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { AppColors, AppFonts, BaseAppDimensions } from "../../styles/globalStyles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { TouchableOpacity } from "react-native";
import CurrentAssignmentModal from "./CurrentAssignmentModal";

const CurrentAssignment = (props) => {
  const [key, setKey] = useState(0); // In order to restart timer run this function:   setKey((prevKey) => prevKey + 1)
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => setVisible(!visible)}>
      <CurrentAssignmentModal visible={visible} setVisible={setVisible} timerKey={key} />
      <View style={styles.container}>
        <View
          style={{
            borderRightWidth: 0.5,
            width: "75%",
            borderColor: "#A9A9A9",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.nameText}>Derivatives HW</Text>
          </View>
          <View>
            <Text style={styles.descriptionText} numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fu
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <CountdownCircleTimer
            isPlaying
            key={key}
            duration={1800} //Seconds of length of assignment/task
            size={70}
            strokeWidth={6}
            colors={AppColors.primaryAccentColor}
            onComplete={() => setVisible(true)}
          >
            {({ remainingTime }) => {
              return (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: AppFonts.SFBOLD,
                      color: AppColors.primaryBackgroundColor,
                    }}
                  >
                    {Math.ceil(remainingTime / 60)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: AppFonts.SFRegular,
                      color: AppColors.primaryBackgroundColor,
                    }}
                  >
                    Min Left
                  </Text>
                </View>
              );
            }}
          </CountdownCircleTimer>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    width: BaseAppDimensions.screenWidth / 1.1,
    alignSelf: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    height: 80,
    padding: 5,
  },
  headerText: {
    padding: 5,
    fontFamily: AppFonts.SFRegular,
    fontSize: 12,
  },
  nameText: {
    padding: 5,
    fontFamily: AppFonts.SFBOLD,
    fontSize: 14,
  },
  timeText: {
    fontFamily: AppFonts.SFRegular,
    fontSize: 14,
    padding: 5,
    color: "#888888",
  },
  descriptionText: {
    fontFamily: AppFonts.SFRegular,
    fontSize: 11,
    padding: 5,
    paddingRight: 10,
  },
});

export default CurrentAssignment;
