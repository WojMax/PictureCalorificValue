import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import CalorieCamera from "../components/Camera/CalorieCamera";

export default function CameraScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <CalorieCamera navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
