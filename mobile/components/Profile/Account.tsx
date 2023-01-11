import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import t from "../../services/translations";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View as DefaultView } from "react-native";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function Account() {
  const colorScheme = useColorScheme();
  const [username, setusername] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userName = await Auth.currentUserInfo();
    if (userName.attributes.email) setusername(userName.attributes.email);
    return;
  };

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
          {t("profile.account")}
        </Text>
      </DefaultView>
      <DefaultView style={styles.data}>
        <DefaultView
          style={[styles.avatar, { backgroundColor: "#4287f520" }]}
        ></DefaultView>
        <Text style={styles.dataText}> {username} </Text>
      </DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 6,
  },
  account: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: { flex: 6 },
  avatar: {
    margin: 6,
    width: 48,
    height: 48,
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
