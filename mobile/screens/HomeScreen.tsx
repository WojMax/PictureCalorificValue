import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { HomeTabScreenProps } from "../types";
import Button from "../elements/Button";
import * as Localisation from "expo-localization";
import i18n from "i18n-js";
import t from "../services/translations";

export default function HomeScreen({ navigation }: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("common.addProduct")}</Text>
      <Button
        title={t("common.addProduct")}
        onPress={() => navigation.navigate("Add")}
      />
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
