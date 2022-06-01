import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import ButtonBasic from "../Elements/ButtonBasic";
import { HomeTabScreenProps } from "../types";

export default function AddFormScreen({
  navigation,
}: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <ButtonBasic
        title={"Take photo"}
        onPress={() => navigation.navigate("Camera")}
      />
      <ButtonBasic
        title={"Add meal"}
        onPress={() => navigation.navigate("AddForm")}
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