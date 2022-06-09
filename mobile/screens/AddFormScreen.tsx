import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { HomeTabScreenProps } from "../types";

export default function AddFormScreen({
  navigation,
}: HomeTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input label={"Name"} placeholder={"Enter name"} />
        <Input
          label={"Calories"}
          placeholder={"Enter calories for 100g"}
          keyboardType={"numeric"}
        />
        <Input
          label={"Weight"}
          placeholder={"Enter weight in grams"}
          keyboardType={"numeric"}
        />
        <Input
          label={"Sum of calories"}
          placeholder={"Ender consumed calories"}
          keyboardType={"numeric"}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Add product"}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingTop: 10,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
