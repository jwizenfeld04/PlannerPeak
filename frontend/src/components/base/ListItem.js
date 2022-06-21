import React from "react";
import { Text } from "react-native";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
  AppImages,
  AppFonts,
} from "../../styles/globalStyles";
import styles from "./styles";
import { ListItem, Icon, Avatar } from "react-native-elements";

export default function CustomListItem(props) {
  const trailingIcon = () => {
    if (props.trailingIconAvatar) {
      return <Avatar source={AppImages.schoologyIcon} size={40} />;
    } else {
      return <Avatar source={AppImages.plannerPeakIcon} size={40} />;
    }
  };
  const grade = () => {
    if (props.grade) {
      return (
        <Text
          style={{
            color: props.leadingIconColor,
            fontFamily: AppFonts.primaryText,
          }}
        >
          {props.grade}%
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            color: props.leadingIconColor,
            fontFamily: AppFonts.primaryText,
          }}
        >
          N/A
        </Text>
      );
    }
  };

  return (
    <ListItem
      key={props.id}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      bottomDivider
      containerStyle={styles.listItemContainer}
      underlayColor="white"
    >
      {props.leadingIcon ? (
        <Icon
          name={props.leadingIconName}
          type={props.leadingIconType}
          color={props.leadingIconColor ? props.leadingIconColor : "black"}
          size={props.leadingIconSize ? props.leadingIconSize : 17}
        />
      ) : null}

      <ListItem.Content>
        <ListItem.Title
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            width: BaseAppDimensions.screenWidth / 1.9,
            fontFamily: AppFonts.primaryText,
          }}
        >
          {props.title}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            fontSize: 12,
            marginTop: 5,
            fontStyle: "italic",
            color: props.subtitleColor,
            fontFamily: AppFonts.primaryTextItalic,
          }}
        >
          {props.subtitle}
        </ListItem.Subtitle>
      </ListItem.Content>
      {props.showGrade ? grade() : null}
      {props.trailingIcon ? trailingIcon() : null}
    </ListItem>
  );
}
