import { StyleSheet } from "react-native";

const courseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: "#ADD8E6",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
  courseBorder: {
    borderColor: "black",
    borderWidth: 2,
    margin: 20,
  },
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
    justifyContent: "center",
  },
  assignmentBorder: {
    borderColor: "black",
    borderWidth: 2,
    margin: 20,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  coursePreferences: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  radioButton: {
   flexDirection: "row"
  },

});

export default courseScreenStyles;
