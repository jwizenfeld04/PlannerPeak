import { StyleSheet } from "react-native";
import { AppColors, AppFonts } from "../../../styles/globalStyles";

const styles = StyleSheet.create({
  fullTextInputContainer: {
    height: "12%",
    width: "94%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    flex: 5,
    borderRadius: 3
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
    width:'100%',
    height: "100%",
    fontSize: 18,
  },
  errorText: { marginTop: 6, color: "red", fontSize: 10, fontFamily:AppFonts.SFRegular },
});

export default styles;
