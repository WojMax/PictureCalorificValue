import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import t from "../../services/translations";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View as DefaultView } from "react-native";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function Objective() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].surface,
        },
      ]}
    >
      <DefaultView style={styles.account}>
        <Text
          style={[styles.dataText, { color: Colors[colorScheme].textDark }]}
        >
          Objective
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textLight}
          style={styles.icon}
        />
      </DefaultView>
      <DefaultView style={styles.data}></DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  account: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: { flex: 5 },
  avatar: {
    margin: 4,
    width: 48,
    height: 48,
    backgroundColor: Colors.dark.topSurface,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  dataText: {
    fontSize: 14,
  },
  icon: {
    paddingRight: 2,
  },
});
