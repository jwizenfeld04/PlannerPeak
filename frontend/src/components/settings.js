import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import store from "../redux/store";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button
        title="Logout"
        onPress={() => {
          store.dispatch({
            type: "user/logoutUser",
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
