import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import { HomeTabScreenProps } from "../types";

export default function AddFormScreen({
  navigation,
}: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Button
        title={"Add product"}
        onPress={() => navigation.navigate("AddForm")}
      />
      <Button
        title={"Take photo"}
        onPress={() => navigation.navigate("Camera")}
=======
      <AddButtons 
        AddFoodOnPress={() => navigation.navigate("AddForm")}
        CameraOnPress={() => navigation.navigate("Camera")}
        navigation={navigation}
>>>>>>> Stashed changes
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
