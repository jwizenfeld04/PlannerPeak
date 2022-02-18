import React from 'react';
import { View, Text, Button } from 'react-native';

const PriorityBoxes = (props) => {
  return (
    <View>
      <Text>Priority: {props.priority}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="1"
          onPress={() => {
            props.onPress(1);
          }}
        />
        <Button
          title="2"
          onPress={() => {
            props.onPress(2);
          }}
        />
        <Button
          title="3"
          onPress={() => {
            props.onPress(3);
          }}
        />
      </View>
    </View>
  );
};

export default PriorityBoxes;