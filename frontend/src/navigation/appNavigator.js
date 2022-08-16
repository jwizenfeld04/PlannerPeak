import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text } from "react-native";

// Import mock screens
import CourseScreen from "../screens/CourseScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { AppColors, AppDimensions, AppFonts } from "../styles/globalStyles";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={true}
      activeColor={"white"}
      barStyle={{
        backgroundColor: AppColors.primaryBackgroundColor,
        height: AppDimensions.bottomTabHeight,
        borderTopColor: AppColors.primaryAccentColor,
        borderTopWidth: 1.5,
      }}
      inactiveColor={AppColors.primaryAccentColor}
    >
      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: AppFonts.SFRegular }}>Courses</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: AppFonts.SFRegular }}>Home</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: AppFonts.SFRegular }}>Settings</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
