import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  registerImage: {
    marginTop: 50,
    marginBottom: 20,
  },
  loginImage: {
    marginTop: 50,
    marginBottom: 100,
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
  errorText: {
    color: "red",
  },
});

export default styles;
