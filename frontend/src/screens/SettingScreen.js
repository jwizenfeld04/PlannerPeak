import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Text, Button, Linking, Alert, SafeAreaView } from "react-native";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  authorizeSchoology,
  resetLink,
} from "../redux/features/schoology/schoologySlice";
import { selectIsSchoologyAuthenticated } from "../redux/features/user/userSlice";
import Header from "../components/base/Header";
import { AppColors, AppDimensions, AppImages } from "../styles/globalStyles";
import IntegrationIcon from "../components/base/IntegrationIcon";
import CustomButton from "../components/base/Button";

export default function SettingScreen() {
  const dispatch = useDispatch();
  const schoologyUrl = useSelector(selectUrl); // Gets Schoology URL from Schoology API Request
  const isSchoologyAuth = useSelector(selectIsSchoologyAuthenticated); // Boolean whether schoology auth or not
  const schoologyConfig = {
    callbackUrl: "plannerpeak.com/schoologyredirect", // TODO: Change to DEEP LINK when available
  };

  // Opens Schoology URL if button pressed to connect Schoology
  useEffect(() => {
    if (schoologyUrl === null) {
      console.log("servor error");
    } else if (schoologyUrl !== "" && schoologyUrl !== null) {
      Linking.openURL(schoologyUrl);
      dispatch(resetLink()); // Resets link in Async Storage after dispatch to avoid errors if OAuth procedure fails
    }
  }, [schoologyUrl]);

  useEffect(() => {}, [isSchoologyAuth]);

  // Creates alert and when "Continue" is pressed, makes API request to retreive Schoology URL
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

  // Button tied to Schoology alert: initiate Oauth process
  const schoologyLoginButton = () => {
    if (!isSchoologyAuth) {
      schoologyAlert();
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.primaryBackgroundColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header title={"Settings"} />
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            flex: 1,
            paddingTop: 10,
          }}
        >
          <CustomButton
            title="Logout"
            onPress={() => {
              store.dispatch({
                type: "user/logoutUser",
              });
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "flex-start",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <IntegrationIcon
            isAuth={isSchoologyAuth}
            icon={AppImages.schoologyIcon}
            onPress={schoologyLoginButton}
          />
          <IntegrationIcon isAuth={false} icon={AppImages.googleClassroomIcon} />
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
