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
    marginBottom: 20,
    width: 350,
    borderWidth: 0,
    borderRadius: 16,
    shadowOffset: { height: 2, width: -2 },
    shadowColor: "#E2EFF6",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  courseTitle: {
    fontSize: 22,
    color: "black",
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 2,
  },
  courseSubtitle: {
    fontSize: 12,
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
    width: 350,
  },
  courseHeaderTitle: {
    fontSize: 40,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default courseScreenStyles;
