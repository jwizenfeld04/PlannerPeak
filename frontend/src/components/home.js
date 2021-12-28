import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, getUserInfo } from "../redux/features/user/userSlice";
import { useState, useEffect } from "react";
import { selectToken, selectUserName } from "../redux/features/user/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);

  useEffect(() => {
    dispatch(getUserInfo(token));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Welcome {name}</Text>
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
  textInput: {
    borderColor: "black",
    borderWidth: 2,
  },
});
