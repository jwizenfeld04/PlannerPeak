import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

// Import mock screens
import CourseScreen from "../screens/CourseScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { AppColors } from "../styles/globalStyles";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{
        backgroundColor: AppColors.primaryBackgroundColor,
        borderRadius: 16,
      }}
    >
      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{
          tabBarLabel: "Courses",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="book-open"
              color={AppColors.primaryAccentColor}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={AppColors.primaryAccentColor}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="settings"
              color={AppColors.primaryAccentColor}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
