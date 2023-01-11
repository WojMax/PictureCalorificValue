import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  View: {
    flex: 1,
  },
  Button: {
    marginVertical: 6,
    marginHorizontal: 3,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  Text: {
    color: Colors.general.accent,
    paddingTop: 4,
    paddingBottom: 2,
    fontWeight: "bold",
  },
});
