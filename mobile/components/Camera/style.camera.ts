import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  topContainer: {
    flex: 5,
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  takePhotoButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    borderWidth: 4,
    backgroundColor: "white",
    borderColor: Colors.general.cameraGray,
  },
  button: {
    borderWidth: 10,
    borderRadius: 50,
    backgroundColor: Colors.general.cameraGray,
    borderColor: Colors.general.cameraGray,
  },
  text: {
    fontSize: 18,
  },
});
