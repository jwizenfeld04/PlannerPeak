import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import ColorPalette from "react-native-color-palette";

export default function ColorModal(props) {
  return (
    <Modal
      isVisible={props.colorSwitch}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionOutTiming={0}
      style={{ alignItems: "flex-end" }}
      onBackdropPress={() => {
        props.setColorSwitch(false);
      }}
    >
      <View
        style={{
          marginTop: props.windowHeight / 10,
          width: 35,
          height: 100,
          flex: 1,
        }}
      >
        <ColorPalette
          onChange={(color) => {
           props.setColorSwitch(false);
           props.onModalColorChange(color)
          }}
          title={""}
          defaultColor={props.color}
          colors={[
            "#C0392B",
            "#E74C3C",
            "#9B59B6",
            "#8E44AD",
            "#2980B9",
            "green",
            "skyblue",
            "yellow",
            "purple",
            "grey",
          ]}
        />
      </View>
    </Modal>
  );
}
