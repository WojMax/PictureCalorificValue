import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View as DefaultView } from "react-native";
import { useAppSelector } from "../../hooks/useRedux";

type Props = {
  date: Date;
  DateOnPress: () => void;
};

export default function DateListItem({ date, DateOnPress }: Props) {
  const colorScheme = useColorScheme();
  const selectedDate = useAppSelector((state) => state.homeMeal.date);

  const day = date.getDate();
  const monthYear =
    date.getMonth() + 1 + "." + date.getUTCFullYear().toString().substring(2);

  const color = {
    borderColor: Colors[colorScheme].textDark,
    backgroundColor: Colors[colorScheme].surface,
  };
  const colorSelected = {
    borderColor: Colors[colorScheme].accent,
    backgroundColor: Colors[colorScheme].accent,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedDate == date.toString() ? colorSelected : color,
      ]}
      onPress={DateOnPress}
    >
      <Text style={styles.day}>{day}</Text>
      <DefaultView style={styles.monthYearCon}>
        <Text
          style={[
            styles.monthYear,
            {
              color:
                selectedDate == date.toString()
                  ? Colors[colorScheme].text
                  : Colors[colorScheme].textLight,
            },
          ]}
        >
          {monthYear}
        </Text>
      </DefaultView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 52,
    marginHorizontal: 6,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  monthYear: {
    fontSize: 10,
  },
});
