import courseScreenStyles from "../../styles/courseScreenStyles";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const Header = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={courseScreenStyles.headerText}>Courses</Text>
      <TouchableOpacity>
        <Icon
          name="plus-box"
          type="material-community"
          size={50}
          style={{ marginTop: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
