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
      courseTitle: {
        fontSize: 30,
      },
      closeText: {
        fontSize: 24,
        color: "#00479e",
        textAlign: "center",
        justifyContent: "center",
      },
      test: {
          fontSize: 200,
      }
});

export default courseScreenStyles;
