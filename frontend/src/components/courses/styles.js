import { StyleSheet, Dimensions } from "react-native";
import { AppColors, AppDimensions, BaseAppDimensions } from "../../styles/globalStyles";

const styles = StyleSheet.create({
  noAssignmentText: {
    fontSize: 22,
    color: "black",
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 2,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBottomColor: {
    borderBottomColor: "#2476B1",
    borderBottomWidth: 3,
  },
  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 12,
    marginTop: 12,
  },
  textInput: {
    height: 50,
    width: "70%",
    flex: 1,
    padding: 10,
    marginLeft: 40,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4169e1",
  },
  swipeableIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
    width: BaseAppDimensions.screenWidth / 6,
    flex: 1,
    shadowOffset: { height: 2, width: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default styles;
