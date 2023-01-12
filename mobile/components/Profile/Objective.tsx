import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import t from "../../services/translations";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View as DefaultView } from "react-native";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { getCaloricDemand, getProfile } from "../../redux/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export default function Objective() {
  const colorScheme = useColorScheme();
  const profile = useAppSelector((state) => state.profile.profile);
  const caloricDemand = useAppSelector((state) => state.profile.caloricDemand);

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
          {t("profile.objective")}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textLight}
          style={styles.icon}
        />
      </DefaultView>
      <DefaultView style={styles.data}>
        <Text style={styles.goalWeightText}>
          {profile?.goal_weight ? profile?.goal_weight : profile?.weight}
          <Text
            style={[{ fontSize: 14 }, { color: Colors[colorScheme].textLight }]}
          >
            {" "}
            kg
          </Text>
        </Text>
        <Text style={styles.goalText}>
          {profile?.goal === "lose weight"
            ? t("profile.objective2")
            : profile?.goal === "gain weight"
            ? t("profile.objective3")
            : t("profile.objective1")}
        </Text>
        <Text style={styles.caloriesText}>
          {t("profile.objective_calories")}
        </Text>
        <Text
          style={[
            styles.calories1Text,
            { color: Colors[colorScheme].textDark },
          ]}
        >
          {caloricDemand}
        </Text>
      </DefaultView>
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
  dataText: {
    fontSize: 14,
  },
  goalText: {
    fontSize: 18,
    color: Colors.general.accentLight,
    paddingBottom: 8,
  },
  caloriesText: {
    fontSize: 16,
    paddingTop: 5,
  },
  calories1Text: {
    fontSize: 16,
    paddingTop: 3,
  },
  goalWeightText: {
    fontSize: 30,
  },
  icon: {
    paddingRight: 2,
  },
});
