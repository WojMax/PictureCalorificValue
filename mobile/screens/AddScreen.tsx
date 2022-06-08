import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import { HomeTabScreenProps } from "../types";

export default function AddFormScreen({
  navigation,
}: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Button
        title={"Take photo"}
        onPress={() => navigation.navigate("Camera")}
      />
      <Button
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
