import { StyleSheet, Dimensions } from "react-native";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
} from "../../styles/globalStyles";

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textInputContainer: {},
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
