import { StyleSheet, Dimensions } from "react-native";
import { AppColors, AppDimensions, BaseAppDimensions } from "../../styles/globalStyles";

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    flexDirection:'row'
  },
  headerContainer: {
    height: AppDimensions.headerHeight,
    backgroundColor: AppColors.primaryBackgroundColor,
    borderBottomColor: AppColors.primaryAccentColor,
    borderBottomWidth: 1.5,
    width: BaseAppDimensions.screenWidth,
    flexDirection: "row",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItemContainer: {
    marginTop: 20,
    width: BaseAppDimensions.screenWidth / 1.05,
    borderWidth: 0,
    borderRadius: 16,
    shadowOffset: { height: 2, width: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: "#F1F1F1",
  },
});

export default styles;
