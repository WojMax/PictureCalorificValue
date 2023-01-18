import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  topContainer: {
    flex: 5,
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flex: 2,
    marginHorizontal: 100,
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
  button2Container: {
    flex: 0,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  caloriesTopContainer: {
    flex: 28,
    backgroundColor: "transparent",
  },
  caloriesMidContainer: {
    borderTopWidth: 2,
    borderColor: Colors.general.accent,
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(40, 40, 40, 0.7)",
  },
  caloriesErrorContainer: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.surface,
  },
  caloriesMid2Container: {
    paddingTop: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(40, 40, 40, 0)",
  },
  caloriesBottomContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.dark.surface,
  },
  caloriesBottom2Container: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: Colors.dark.surface,
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
    textTransform: "uppercase",
    flex: 0,
    fontSize: 28,
    paddingVertical: 5,
    color: "white",
    textAlign: "center",
  },
  text2: {
    flex: 0,
    fontSize: 30,
    paddingVertical: 5,
    color: "white",
    textAlign: "center",
  },
  text3: {
    lineHeight: 14,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});
