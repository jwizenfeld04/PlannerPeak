import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Profiles() {
  return (
    <View>
      <Text>User Information</Text>
      <Text>Name: </Text>
      <Text>Email: </Text>
      <Text>Token:</Text>
      <Button title="Login" onPress={() => {}} />
    </View>
  );
}
