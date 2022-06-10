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
            "#E67E22",
            "#F1C40F",
            "#16A085",
            "#2980B9",
            "#8E44AD",
            "#FFC0CB",
            "#FA8072",
            "#39FF14",
            "#808080",
          ]}
        />
      </View>
    </Modal>
  );
}
