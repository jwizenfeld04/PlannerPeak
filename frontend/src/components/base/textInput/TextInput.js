import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";
import { AppColors } from "../../../styles/globalStyles";
import TouchableIcon from "../TouchableIcon";
import { formatPhoneNumber } from "../../register/formatPhoneNumber";

const CustomTextInput = (props) => {
  const [password, setPassword] = useState(props.password);

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
      <View
        style={{
          ...styles.textInputIconContainer,
          paddingLeft: 0,
          paddingRight: 8,
          zIndex: 1,
        }}
      >
        <TouchableIcon
          name={password ? "eye-off-outline" : "eye-outline"}
          type={"ionicon"}
          size={20}
          color={"grey"}
          onPress={() => {
            setPassword(!password);
          }}
        />
      </View>
    );
  };

  const label = () => {
    return (
      <View style={styles.textInputLabelContainer}>
        <Text style={styles.textInputLabel}>{props.label}</Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.fullTextInputContainer, ...props.styles }}>
      {props.label ? label() : null}
      <View style={{ ...styles.textInputContainer, borderColor: props.borderColor }}>
        {leadingIcon()}
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder ? props.placeholder : ""}
          placeholderTextColor={"grey"}
          textAlign={props.textAlign ? props.textAlign : "center"}
          autoCorrect={props.autoCorrect ? props.autoCorrect : true}
          secureTextEntry={password}
          onChangeText={props.phone ? (e)=>formatPhoneNumber(e): null}
          {...props}
        />
        {/* {props.password && passwordIcon()} */}
      </View>
      <View style={{ flex: 4, alignItems: "center", width: "100%" }}>
        {props.error && <Text style={styles.errorText}>{props.error}</Text>}
      </View>
    </View>
  );
};

export default CustomTextInput;
