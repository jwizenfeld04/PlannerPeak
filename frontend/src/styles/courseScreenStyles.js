import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const courseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D82BD",
    width: "100%",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 10,
    textAlign: "left",
    margin: 10,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },
  coursePreferences: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  radioButton: {
    flexDirection: "row",
  },
  courseView: {
    backgroundColor: "#E2EFF6",
    borderWidth: 0,
    borderRadius: 16,
    width: 350,
    height: 45,
    marginBottom: 12,
    marginTop: 12,
    justifyContent: "flex-start",
    shadowOffset: { height: 2, width: -2 },
    shadowColor: "#E2EFF6",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flexDirection: "row",
  },
  courseTitle: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginLeft: 10,
  },
  flatList: {
    alignItems: "center",
  },
  courseIcon: {
    width: "13%",
    height: "100%",

  },
  courseIconView: {
    width:350,
  },
  courseHeaderTitle: {
    fontSize: 40,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default courseScreenStyles;
