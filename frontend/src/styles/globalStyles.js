import { StyleSheet, Dimensions } from "react-native";

export const AppColors = {
  primaryBackgroundColor: "#2476B1",
  primaryAccentColor: "#B7D7EA",
  primaryTextColor: "black",
  dockColor: "#003A70",
};

const IMAGE_SOURCE = "../assets/images";

export const AppImages = {
  schoologyIcon: require(`${IMAGE_SOURCE}/schoologyIcon.png`),
  plannerPeakIcon: require(`${IMAGE_SOURCE}/plannerPeakIcon.png`),
};

export const BaseAppDimensions = {
  screenHeight: Dimensions.get("window").height,
  screenWidth: Dimensions.get("window").width,
};

export const AppDimensions = {
    bottomTabHeight: BaseAppDimensions.screenHeight/12,
    headerHeight: BaseAppDimensions.screenHeight/14,

}

