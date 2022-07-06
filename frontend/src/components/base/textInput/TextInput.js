import React from "react";
import { TextInput, View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";
import { AppColors } from "../../../styles/globalStyles";

const CustomTextInput = (props) => {
  return (
    <View style={styles.fullTextInputContainer}>
      <View style={styles.textInputLabelContainer}>
        <Text style={styles.textInputLabel}>{props.label}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputIconContainer}>
          {props.iconName ? (
            <Icon name={props.iconName} type={props.iconType} size={18} color={AppColors.primaryAccentColor}/>
          ) : null}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder ? props.placeholder : ""}
          placeholderTextColor={
            props.placeholderTextColor ? props.placeholderTextColor : "grey"
          }
          textAlign={props.textAlign ? props.textAlign : "left"}
          autoCorrect={props.autoCorrect ? props.autoCorrect : true}
          {...props}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
