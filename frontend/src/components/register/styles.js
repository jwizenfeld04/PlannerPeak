import { StyleSheet } from "react-native";

const RegisterFormStyles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'blue',
      padding: 10,
      margin:10,
      fontSize: 18,
      borderRadius: 6,
    },

    entireForm: {
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 6,
        width:350,
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
});

export default RegisterFormStyles;
