import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";
import { AppColors } from "../../../styles/globalStyles";
import TouchableIcon from "../TouchableIcon";

const CustomTextInput = (props) => {
  const [password, setPassword] = useState(false);

  const leadingIcon = () => {
    if (props.iconName) {
      return (
        <View style={styles.textInputIconContainer}>
          <Icon
            name={props.iconName}
            type={props.iconType}
            size={18}
            color={AppColors.primaryBackgroundColor}
          />
        </View>
      );
    }
  };

  const passwordIcon = () => {
    return (
      <View style={{ paddingRight: 8, zIndex: 1 }}>
        <TouchableIcon
          name={password ? "eye-off-outline" : "eye-outline"}
          type={"ionicon"}
          size={20}
          color={AppColors.primaryBackgroundColor}
          onPress={() => {
            setPassword(!password);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.fullTextInputContainer}>
      <View style={styles.textInputLabelContainer}>
        <Text style={styles.textInputLabel}>{props.label}</Text>
      </View>
      <View style={styles.textInputContainer}>
        {leadingIcon()}
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder ? props.placeholder : ""}
          placeholderTextColor={AppColors.primaryBackgroundColor}
          textAlign={props.textAlign ? props.textAlign : "left"}
          autoCorrect={props.autoCorrect ? props.autoCorrect : true}
          secureTextEntry={password}
          {...props}
        />
        {props.password && passwordIcon()}
      </View>
      {props.error && (
        <Text style={styles.errorText}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;
