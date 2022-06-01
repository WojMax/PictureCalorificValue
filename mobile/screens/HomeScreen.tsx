import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { HomeTabScreenProps, RootTabScreenProps } from "../types";
import ButtonBasic from "../elements/ButtonBasic";

export default function HomeScreen({ navigation }: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <ButtonBasic
        title={"Add product"}
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
