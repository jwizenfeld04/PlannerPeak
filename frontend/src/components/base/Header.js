import React from "react";
import { Text, View } from "react-native";

import TouchableIcon from "./TouchableIcon";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";

import { AppColors, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";

export default function Header(props) {
  return (
    <View style={styles.headerContainer}>
        {props.backButton ? (
          <View style={{ ...styles.iconContainer, paddingLeft: 15 }}>
          <TouchableIcon
            name={"chevron-back-sharp"}
            type={"ionicon"}
            onPress={props.onBackButtonPress}
            color={props.iconColor}
          />
           </View>
        ) : null}
        {props.iconName1 && !props.deleteMode && !props.saveButton ? (
           <View style={{ ...styles.iconContainer, paddingLeft: 15 }}>
          <TouchableIcon
            name={props.iconName1}
            type={props.iconType1}
            onPress={props.onIconPress1}
            color={props.iconColor}
          />
          </View>
        ) : null}
      <View style={styles.headerTitleContainer}>
        <Text
          style={{
            fontSize: props.titleSize ? props.titleSize : 24,
            color: AppColors.primaryBackgroundColor,
            fontFamily: AppFonts.SFBOLD,
            
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.title}
        </Text>
      </View>
      <View style={{ ...styles.iconContainer, paddingRight: 15 }}>
        {props.iconName2 && !props.deleteMode && !props.saveButton ? (
          <TouchableIcon
            name={props.iconName2}
            type={props.iconType2}
            onPress={props.onIconPress2}
            color={props.iconColor}
          />
        ) : null}
        {props.saveButton ? <SaveButton onPress={props.onSavePress} /> : null}
        {props.deleteButton ? <DeleteButton onPress={props.onDeletePress} /> : null}
      </View>
    </View>
  );
}
