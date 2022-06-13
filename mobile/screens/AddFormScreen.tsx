import { StyleSheet, ToastAndroid } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddFormScreen(props: any) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(
    props.route.params
      ? props.route.params.calories
        ? props.route.params.calories
        : ""
      : ""
  );
  const [weight, setWeight] = useState(0);
  const [sumOfCalories, setSumOfCalories] = useState(0);

  const save = () => {
    if (weight == 0) {
      ToastAndroid.show("Provide meal weight", ToastAndroid.SHORT);
      return;
    }
    if (calories == 0) {
      ToastAndroid.show("Provide meal calories", ToastAndroid.SHORT);
      return;
    }
    const meal = {
      userID: "15a227be-8a9e-438f-85b9-8abc7f6832bc",
      mealName: name,
      calories: calories,
      mealWeight: weight,
      dateCreated:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      category: "breakfast",
    };
    console.log(meal);
    axios
      .put(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/meal",
        meal
      )
      .then((res) => {
        console.log(res);
        props.navigation.navigate("Home");
      })
      .catch((er) => {
        console.log(er);
        ToastAndroid.show("ERROR", ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={"Name"}
          placeholder={"Enter name"}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={"Calories"}
          placeholder={"Enter calories for 100g"}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: string) => setCalories(value)}
        />
        <Input
          label={"Weight"}
          placeholder={"Enter weight in grams"}
          keyboardType={"numeric"}
          onChangeText={(value: number) => setWeight(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={"Add product"} onPress={() => save()} />
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
