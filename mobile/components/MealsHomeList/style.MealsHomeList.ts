import { StyleSheet } from "react-native";

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
  },
  containerBottom: {
    flexDirection: "row",
  },
  containerCalories: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
  },
  calText: {
    fontSize: 16,
  },
  kcal100Text: {
    fontSize: 14,
  },
});
export default listStyles;
