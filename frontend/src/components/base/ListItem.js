import React from "react";
import { BaseAppDimensions, AppImages, AppFonts } from "../../styles/globalStyles";
import styles from "./styles";
import { ListItem, Icon, Avatar } from "react-native-elements";
import CustomText from "./CustomText";

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
      return <CustomText text={`${props.grade}%`} color={props.leadingIconColor} />;
    } else {
      return <CustomText text="N/A" color={props.leadingIconColor} />;
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
      <ListItem.Content>
        <ListItem.Title
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            width: BaseAppDimensions.screenWidth / 1.7,
            fontFamily: AppFonts.SFRegular,
            fontSize: 18,
          }}
        >
          {props.leadingIcon ? (
            <Icon
              name={props.leadingIconName}
              type={props.leadingIconType}
              color={props.leadingIconColor ? props.leadingIconColor : "black"}
              size={props.leadingIconSize ? props.leadingIconSize : 17}
              style={{ paddingRight: 8 }}
            />
          ) : null}
          {props.title}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            fontSize: 12,
            color: props.subtitleColor,
            fontFamily: AppFonts.SFItalic,
            paddingTop: 5,
            paddingLeft: 3.5,
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
