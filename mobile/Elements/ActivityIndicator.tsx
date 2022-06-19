import React from "react";
import {
  ActivityIndicator as React_ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";

type Props = {
  text?: string;
};

export default function ActivityIndicator(props: Props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <React_ActivityIndicator size="large" color={Colors.general.accent} />
      <Text style={{ fontSize: 16, paddingTop: 10 }}>{props.text}</Text>
    </View>
  );
}
