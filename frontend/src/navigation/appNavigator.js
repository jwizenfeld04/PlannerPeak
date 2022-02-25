import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <MaterialCommunityIcons
              name="book"
              color={AppColors.primaryAccentColor}
              size={26}
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
            <MaterialCommunityIcons
              name="account-settings"
              color={AppColors.primaryAccentColor}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
