import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
} from "react-native";
import store from "../redux/store";
import { selectToken } from "../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  authorizeSchoology,
  resetLink,
} from "../redux/features/schoology/schoologySlice";
import { selectIsSchoologyAuthenticated } from "../redux/features/user/userSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const schoologyUrl = useSelector(selectUrl);
  const isSchoologyAuth = useSelector(selectIsSchoologyAuthenticated);
  const schoologyConfig = {
    token: useSelector(selectToken),
    callbackUrl: "plannerpeak.com/schoologyredirect",
  };

  useEffect(() => {
    if (schoologyUrl === null) {
      console.log("servor error");
    } else if (schoologyUrl !== "" && schoologyUrl !== null) {
      Linking.openURL(schoologyUrl);
      dispatch(resetLink());
    }
  }, [schoologyUrl]);

  const schoologyAlert = () =>
    Alert.alert("Connet Your Schoology Account", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => dispatch(authorizeSchoology(schoologyConfig)),
      },
    ]);

  const schoologyLoginButton = () => {
    if (isSchoologyAuth) {
      return <Text>Schoology Authenticated</Text>;
    } else {
      return (
        <Button
          title="Connect Schoology"
          onPress={() => {
            schoologyAlert();
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={() => {
          store.dispatch({
            type: "user/logoutUser",
          });
        }}
      />
      {schoologyLoginButton()}
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
