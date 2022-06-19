import React from "react";
import { ActivityIndicator as React_ActivityIndicator } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function ActivityIndicator() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <React_ActivityIndicator size="large" color={Colors.general.accent} />
    </View>
  );
}
