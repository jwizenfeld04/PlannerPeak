import courseScreenStyles from "../../../styles/courseScreenStyles";
import RadioButtons from "./RadioButtons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import React from 'react';
import { View, ScrollView } from 'react-native';


const ColorRadioButtons = (props) => {
  return (
    <View style={courseScreenStyles.radioButton}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={225} //your element width
        snapToAlignment={"center"}
      >
        <RadioForm
          formHorizontal={true}
          animation={true}
          initial={props.checkedColor}
        >
          {/* To create radio buttons, loop through your array of options */}
          {RadioButtons.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={true}
                onPress={() => props.onPress(obj.value)}
                borderWidth={2}
                buttonInnerColor={obj.value}
                buttonOuterColor={
                  props.checkedColor === obj.value ? "black" : "white"
                }
                buttonSize={30}
                buttonOuterSize={39}
                buttonWrapStyle={{ marginLeft: 12, marginRight: 12 }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </ScrollView>
    </View>
  );
};

export default ColorRadioButtons;
