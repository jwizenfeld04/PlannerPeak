import React from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = (props) => {
  return (
    <View style={styles.image}>
      <Image source={require("../../assets/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
