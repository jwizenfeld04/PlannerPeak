import { StyleSheet } from "react-native";
import { AppColors, AppFonts } from "../../../styles/globalStyles";

const styles = StyleSheet.create({
  fullTextInputContainer: {
    height: "18%",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    height: "60%",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  textInputLabel: {
    textAlign: "left",
    fontFamily: AppFonts.primaryText,
    fontSize: 14,
  },
  textInputLabelContainer: { width: "100%", paddingBottom: 3, paddingLeft: 2 },
  textInputIconContainer: { paddingLeft: 8 },
  textInput: { paddingLeft: 10, color: AppColors.primaryBackgroundColor, flex: 1 },
  errorText: { marginTop: 6, color: "red", fontSize: 10 },
});

export default styles;
