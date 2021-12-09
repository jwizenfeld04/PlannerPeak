import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo, useReducer } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "./src/components/context";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import HomeStack from "./src/navigation/HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SplashScreen from "./src/screens/SplashScreen";

// TODO:
// CLEAN UP THE CODE AND PUSH TO GITHUB (HOPEFULLY)
// ADD TABS TO THE HOMEPAGE
// Learn Redux
// Add Django views and serializers for adding courses and assignments and set permission class to isAuthenticated

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevSate, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevSate,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevSate,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevSate,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      SignIn: async (email, password) => {
        let userToken;
        userToken = null;
        axios
          .post("http://192.168.81.59:8000/api/dj-rest-auth/login/", {
            email: email,
            password: password,
          })
          .then(async (response) => {
            await AsyncStorage.setItem("userToken", response.data.key);
            dispatch({ type: "LOGIN", token: response.data.key });
          })
          .catch((e) => {
            console.log(e);
            dispatch({ type: "LOGIN", token: null });
          });
      },
      SignOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      SignUp: async (email, first_name, last_name, password1, password2) => {
        let userToken;
        userToken = null;
        axios
          .post("http://192.168.1.23:8000/api/dj-rest-auth/registration/", {
            email: email,
            first_name: first_name,
            last_name: last_name,
            password1: password1,
            password2: password2,
          })
          .then(async (response) => {
            await AsyncStorage.setItem("userToken", response.data.key);
            dispatch({ type: "REGISTER", token: response.data.key });
          })
          .catch((e) => {
            console.log(e);
            dispatch({ type: "REGISTER", id: null, token: null });
          });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1500);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.loading}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar />
        {<HomeStack />}
        {/*loginState.userToken !== null ? <HomeStack /> : <AuthStack />*/}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
