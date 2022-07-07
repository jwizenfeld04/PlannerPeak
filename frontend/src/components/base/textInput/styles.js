import { StyleSheet } from "react-native";
import { AppColors, AppFonts } from "../../../styles/globalStyles";

const styles = StyleSheet.create({
  fullTextInputContainer: {
    height: "12%",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    height: "40%",
    borderRadius: 3,
    width: "100%",
    alignItems: "center",
    flex: 4,
    backgroundColor: "pink"
  },
  textInputLabel: {
    textAlign: "left",
    fontFamily: AppFonts.primaryText,
    fontSize: 14,
  },
  textInputLabelContainer: {
    width: "100%",
    paddingBottom: 3,
    paddingTop:5,
    paddingLeft: 2,
    flex: 1.5,
  },
  textInputIconContainer: {
    paddingLeft: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    paddingLeft: 10,
    color: AppColors.primaryBackgroundColor,
    flex: 1,
    height: "100%",
    backgroundColor: "green",
  },
  errorText: { marginTop: 6, color: "red", fontSize: 10 },
});

export default styles;
