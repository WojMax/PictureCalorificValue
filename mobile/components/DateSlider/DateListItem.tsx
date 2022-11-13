import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { View as DefaultView } from "react-native";

type Props = {
  date: Date;
};

export default function DateListItem({ date }: Props) {
  const colorScheme = useColorScheme();
  const day = date.getUTCDate();
  const monthYear =
    date.getUTCMonth() + "." + date.getUTCFullYear().toString().substring(2);

  return (
    <DefaultView
      style={[styles.container, { borderColor: Colors[colorScheme].textDark }]}
    >
      <Text style={styles.day}>{day}</Text>
      <DefaultView style={styles.monthYearCon}>
        <Text
          style={[styles.monthYear, { color: Colors[colorScheme].textLight }]}
        >
          {monthYear}
        </Text>
      </DefaultView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 48,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  monthYearCon: {
    display: "flex",
    justifyContent: "center",
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
  },
  monthYear: {
    fontSize: 10,
  },
});
