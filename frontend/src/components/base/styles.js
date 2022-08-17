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
    backgroundColor: "white",
    width: BaseAppDimensions.screenWidth,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 10,
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  listItemContainer: {
    width: BaseAppDimensions.screenWidth,
  },
  buttonContainer: {
    backgroundColor: AppColors.primaryBackgroundColor,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.5,
    padding: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: AppColors.primaryAccentColor,
    fontFamily: AppFonts.SFBOLD,
  },
});

export default styles;
