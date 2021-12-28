import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import store from "../redux/store";
import { selectError, selectToken } from "../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  authorizeSchoology,
  verifySchoology,
} from "../redux/features/schoology/schoologySlice";
import { selectUrl } from "../redux/features/schoology/schoologySlice";

export default function Settings() {
  const dispatch = useDispatch();
  const schoologyUrl = useSelector(selectUrl);
  const schoologyConfig = {
    token: useSelector(selectToken),
    callbackUrl: "plannerpeak.com",
  };

  useEffect(() => {
    if (schoologyUrl) {
      Linking.openURL(schoologyUrl);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>{schoologyUrl}</Text>
      <Button
        title="Logout"
        onPress={() => {
          store.dispatch({
            type: "user/logoutUser",
          });
        }}
      />
      <Button
        title="Connect Schoology"
        onPress={() => {
          dispatch(authorizeSchoology(schoologyConfig));
        }}
      />
      <Button
        title="open link"
        onPress={() => {
          Linking.openURL(schoologyUrl);
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
