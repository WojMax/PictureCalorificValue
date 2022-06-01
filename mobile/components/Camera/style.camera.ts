import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export const styles = StyleSheet.create({
  information: {
    flex: 1,
    height: height,
  },
  container: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  cameraPreview: {
    flex: 1,
  },
});
