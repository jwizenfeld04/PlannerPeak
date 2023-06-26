import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AppFonts, AppColors, BaseAppDimensions } from "../../styles/globalStyles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import TimeButton from "./TimeButton";

export default function CurrentAssignmentModal(props) {
  // Pass duration props to make sure timer is right
  return (
    <View>
      <Modal
        isVisible={props.visible}
        onBackdropPress={() => props.setVisible(false)}
        backdropTransitionOutTiming={0}
      >
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
              <Text style={styles.timeLabel}>10:30 AM</Text>
            </View>
            <View style={{ justifyContent: "space-between", flex: 1, padding: 5 }}>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fu
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.dateText}>Due Date: 8/4/22</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightgreen",
                    alignSelf: "flex-end",
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.SFRegular,
                      fontSize: 14,
                    }}
                  >
                    Finished?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <CountdownCircleTimer
              isPlaying
              key={props.timerKey}
              duration={1800} //Seconds of length of assignment/task
              size={70}
              strokeWidth={6}
              colors={AppColors.primaryAccentColor}
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
            <View style={{ justifyContent: "space-between", flex: 1, paddingTop: 10 }}>
              <TimeButton title="+5" />
              <TimeButton title="+30" />
              <TimeButton title="-5" />
              <TimeButton title="-30" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    width: BaseAppDimensions.screenWidth / 1.1,
    alignSelf: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    height: 300,
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
    fontSize: 16,
  },
  timeLabel: {
    fontFamily: AppFonts.SFRegular,
    fontSize: 16,
    padding: 5,
    color: "#888888",
  },
  descriptionText: {
    fontFamily: AppFonts.SFRegular,
    fontSize: 12,
    paddingRight: 10,
  },
  dateText: {
    fontFamily: AppFonts.SFItalic,
    fontSize: 14,
    color: "red",
  },
});
