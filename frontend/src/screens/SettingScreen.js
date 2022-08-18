import React, { useState, useEffect } from "react";
import { View, Linking, Alert, SafeAreaView } from "react-native";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  authorizeSchoology,
  resetLink,
} from "../redux/features/schoology/schoologySlice";
import {
  selectIsSchoologyAuthenticated,
  selectIsAppleCalendarAuthetnicated,
} from "../redux/features/user/userSlice";
import { AppColors, AppDimensions, AppImages } from "../styles/globalStyles";
import IntegrationIcon from "../components/base/IntegrationIcon";
import CustomButton from "../components/base/Button";
import CustomText from "../components/base/CustomText";

export default function SettingScreen() {
  const dispatch = useDispatch();
  const schoologyUrl = useSelector(selectUrl); // Gets Schoology URL from Schoology API Request
  const isSchoologyAuth = useSelector(selectIsSchoologyAuthenticated); // Boolean whether schoology auth or not
  const isAppleCalendarAuth = useSelector(selectIsAppleCalendarAuthetnicated);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          paddingLeft: 20,
          flex: 2,
        }}
      >
        <CustomText text="Settings" font="bold" size="xl" />
      </View>
      <View style={{ flex: 2, padding: 15, paddingLeft: 20 }}>
        <CustomText text="Integrations:" size={18} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <IntegrationIcon
            isAuth={isSchoologyAuth}
            icon={AppImages.schoologyIcon}
            onPress={schoologyLoginButton}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          title="Logout"
          onPress={() => {
            store.dispatch({
              type: "user/logoutUser",
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
