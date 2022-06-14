import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import i18n from "i18n-js";
import t from "../services/translations";


export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("navigation.favorites")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
