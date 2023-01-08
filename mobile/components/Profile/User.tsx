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

export default function User() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

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
          {t("profile.user")}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textLight}
          style={styles.icon}
        />
      </DefaultView>
      <DefaultView style={styles.inData}>
        <Text
          style={{
            fontSize: 15,
            paddingRight: 5,
            color: Colors.general.accentLight,
          }}
        >
          {t("profile.age")}
        </Text>
        <Text style={{ color: Colors.general.accentLight }}>
          {profile?.age}
        </Text>
      </DefaultView>
      <DefaultView style={styles.data}>
        <DefaultView style={styles.inData}>
          <Text
            style={{
              fontSize: 15,
              paddingRight: 5,
              color: Colors.general.accentLight,
            }}
          >
            {t("profile.height")}
          </Text>
          <Text style={{ color: Colors.general.accentLight }}>
            {profile?.height}
          </Text>
        </DefaultView>
        <DefaultView style={styles.inData}>
          <Text
            style={{
              fontSize: 15,
              paddingRight: 5,
              color: Colors.general.accentLight,
            }}
          >
            {t("profile.weight")}
          </Text>
          <Text style={{ color: Colors.general.accentLight }}>
            {profile?.weight}
          </Text>
        </DefaultView>
        <DefaultView style={styles.inData}>
          <Text
            style={{
              fontSize: 15,
              paddingRight: 5,
              color: Colors.general.accentLight,
            }}
          >
            {t("profile.gender")}
          </Text>
          <Text style={{ color: Colors.general.accentLight }}>
            {profile?.gender}
          </Text>
        </DefaultView>
      </DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 6,
  },
  account: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: { flex: 3 },
  inData: { flexDirection: "row" },
  dataText: {
    fontSize: 14,
  },
  icon: {
    paddingRight: 2,
  },
});
