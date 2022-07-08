import { StyleSheet, Dimensions } from "react-native";
import {
  AppColors,
  AppDimensions,
  AppFonts,
  BaseAppDimensions,
} from "../../styles/globalStyles";

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    flexDirection: "row",
    paddingBottom: 10,
  },
  headerContainer: {
    height: AppDimensions.headerHeight,
    backgroundColor: AppColors.primaryBackgroundColor,
    width: BaseAppDimensions.screenWidth,
    flexDirection: "row",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  listItemContainer: {
    width: BaseAppDimensions.screenWidth,
    borderRadius: 0,
    shadowOffset: { height: 2, width: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#F1F1F1",
  },
  buttonContainer: {
    backgroundColor: AppColors.primaryBackgroundColor,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.5,
    padding:10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: AppColors.primaryAccentColor,
    fontFamily: AppFonts.primaryTextBold
  },
});

export default styles;
