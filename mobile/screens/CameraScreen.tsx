import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import CalorieCamera from "../components/Camera/CalorieCamera";

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <CalorieCamera />
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
