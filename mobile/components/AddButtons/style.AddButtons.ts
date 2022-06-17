import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.general.accentLight,
  },
  View: {
    width: "32%",
    backgroundColor: Colors.general.accentLight,
  },
  Button: {
    marginVertical: "2%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  Text: {
    color: Colors.general.accent,
    fontWeight: "bold",
  },
});
