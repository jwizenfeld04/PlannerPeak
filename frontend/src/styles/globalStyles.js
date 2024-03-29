import { StyleSheet, Dimensions } from "react-native";

export const AppColors = {
  primaryBackgroundColor: "#2476B1",
  primaryAccentColor: "#B7D7EA",
  successColor: 'forestgreen',
  errorColor: 'crimson',

};

export const AppFonts = {
  primaryText: 'MontserratRegular',
  primaryTextBold: 'MontserratBold',
  primaryTextItalic: 'MontserratItalic',
  primaryTextBoldItalic: 'MontserratBoldItalic',
  SFRegular: 'SFRegular',
  SFBOLD: 'SFBold',
  SFItalic: 'SFItalic',
}

const IMAGE_SOURCE = "../assets/images";

export const AppImages = {
  schoologyIcon: require(`${IMAGE_SOURCE}/schoologyIcon.png`),
  plannerPeakIcon: require(`${IMAGE_SOURCE}/plannerPeakIcon.png`),
  googleClassroomIcon: require(`${IMAGE_SOURCE}/googleClassroomIcon.png`),
  appleCalendarIcon: require(`${IMAGE_SOURCE}/appleCalendarIcon.png`),
  addTaskIcon: require(`${IMAGE_SOURCE}/addTaskIcon.png`),
  googleSignin: require(`${IMAGE_SOURCE}/googleSignIn.png`)
};

export const BaseAppDimensions = {
  screenHeight: Dimensions.get("window").height,
  screenWidth: Dimensions.get("window").width,
};

export const AppDimensions = {
    bottomTabHeight: BaseAppDimensions.screenHeight/12,
    headerHeight: BaseAppDimensions.screenHeight/20,
    mainViewHeight: BaseAppDimensions.screenHeight/1.21,
    integrationIcon: BaseAppDimensions.screenWidth/6,
}

