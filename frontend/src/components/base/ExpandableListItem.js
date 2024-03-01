import React, { useState } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import {
  AppColors,
  AppDimensions,
  BaseAppDimensions,
  AppImages,
  AppFonts,
} from "../../styles/globalStyles";
import styles from "./styles";
import { ListItem, Icon } from "react-native-elements";
import TouchableIcon from "./TouchableIcon";

export default function ExpandableListItem(props) {
  const handleExpandableIcon = () => {
    if (expandable) {
      return (
        <TouchableIcon
          name="chevron-with-circle-down"
          type="entypo"
          size={20}
          onPress={() => setExpandable(!expandable)}
        />
      );
    } else {
      return (
        <TouchableIcon
          name="chevron-with-circle-up"
          type="entypo"
          size={20}
          onPress={() => setExpandable(!expandable)}
        />
      );
    }
  };

  const [expandable, setExpandable] = useState(false);

  return (
    <ListItem
      key={props.id}
      bottomDivider
      containerStyle={styles.listItemContainer}
      underlayColor="white"
    >
      <ListItem.Content>
        <ListItem.Title>
          <View
            style={{
              flexDirection: "row",
              width: BaseAppDimensions.screenWidth / 1.18,
            }}
          >
            <View style={{ justifyContent: "center", flex: 1 }}>
              {props.leadingIcon ? (
                <Icon
                  name={props.leadingIconName}
                  type={props.leadingIconType}
                  color={props.leadingIconColor ? props.leadingIconColor : "black"}
                  size={props.leadingIconSize ? props.leadingIconSize : 17}
                  style={{ paddingRight: 8 }}
                />
              ) : null}
            </View>
            <View style={{ justifyContent: "center", flex: 11 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: AppFonts.primaryText,
                  fontSize: 17,
                }}
              >
                {props.title}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {handleExpandableIcon()}
            </View>
          </View>
        </ListItem.Title>

        {expandable ? (
          <ListItem.Subtitle
            style={{
              fontFamily: AppFonts.primaryText,
              paddingBottom: 5,
              paddingTop: 5,
              fontSize: 14,
            }}
          >
            {props.description}
          </ListItem.Subtitle>
        ) : null}

        <ListItem.Subtitle style={{ height: 30 }}>
          <View
            style={{
              flexDirection: "row",
              width: BaseAppDimensions.screenWidth / 1.18,
              paddingTop: 10,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontStyle: "italic",
                  color: props.subtitleColor,
                  fontFamily: AppFonts.primaryTextItalic,
                }}
              >
                {props.subtitle}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {props.maxPoints ? (
                <Text style={{ fontSize: 12, fontFamily: AppFonts.primaryTextItalic }}>
                  Max Points: {props.maxPoints}
                </Text>
              ) : (
                <Text style={{ fontSize: 12, fontFamily: AppFonts.primaryTextItalic }}>
                  Max Points: N/A
                </Text>
              )}
            </View>
          </View>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
