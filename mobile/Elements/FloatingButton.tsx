import React from "react";
import { View, Text } from "../components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { FAB } from "@rneui/base";

type Props = {
  onPress: () => void;
};

export default function FloatingButton(props: Props) {
  return (
    <FAB
      visible={true}
      icon={{ name: "add", color: "white" }}
      color={Colors.general.accent}
      onPress={props.onPress}
    />
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    borderRadius: 1000,
  },
});
