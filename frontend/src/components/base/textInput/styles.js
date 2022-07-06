import { StyleSheet, Dimensions } from "react-native";
import { AppFonts } from "../../../styles/globalStyles";

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
  textInputLabelContainer: { width: "100%", paddingBottom: 3, paddingLeft: 2 },
  textInputLabel: {
    textAlign: "left",
    fontFamily: AppFonts.primaryText,
    fontSize: 14,
  },
  textInputIconContainer: {
    padding: 10,
  },
  textInput: { paddingLeft: 10, width:'100%'},
});

export default styles;
