import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "../components/login";
import Register from "../components/register";

const Tab = createMaterialBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      activeColor="#fff"
      barStyle={{ backgroundColor: "blue" }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="login-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthNavigator;
