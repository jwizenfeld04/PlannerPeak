import { StyleSheet, Text, View } from 'react-native';


export default function Analytics(props) {
  return (
    <View>
      <Text>Analytics Component</Text>
      {props.avgMinutes ? (
          <Text>Average Assignment Minutes: {props.avgMinutes}</Text>
        ) : (
          <Text> No Average Assignment Minutes</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
});
