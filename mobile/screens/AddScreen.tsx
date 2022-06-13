import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import { HomeTabScreenProps } from "../types";
import AddButtons from "../components/AddButtons/AddButtons";

export default function AddFormScreen({
  navigation,
}: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <AddButtons
        AddFoodOnPress={() => navigation.navigate("AddForm")}
        CameraOnPress={() => navigation.navigate("Camera")}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
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
