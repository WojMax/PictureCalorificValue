import { StyleSheet, ToastAndroid } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";

type Meal = {
  meal_name: string;
  calories: number;
  mealWeight: number;
};

export default function EditFormScreen(props: any) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories
        ? props.route.params.calories.toString()
        : ""
      : ""
  );
  const [weight, setWeight] = useState<number>();
  const editFav = () => {
    console.log(calories);
    const meal = {
      userID: "15a227be-8a9e-438f-85b9-8abc7f6832bc",
      mealName: props.route.params.name,
      calories: props.route.params.calories,
      category: props.route.params.category,
      newMealName: name,
      newCalories: calories,
    };
    axios
      .post(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/favourites",
        meal
      )
      .then((res) => {
        props.navigation.navigate("Favorites", {});
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const deleteFav = () => {
    console.log(calories);
    const meal = {
      userID: "15a227be-8a9e-438f-85b9-8abc7f6832bc",
      mealName: props.route.params.name,
      calories: props.route.params.calories,
      category: props.route.params.category,
    };
    axios
      .delete(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/favourites",
        { data: meal }
      )
      .then((res) => {
        props.navigation.navigate("Favorites", {});
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={t("editScreen.name")}
          placeholder={props.route.params.name}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("editScreen.calories")}
          placeholder={props.route.params.calories.toString()}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
        <Input
          label={t("editScreen.weight")}
          placeholder={props.route.params.weight}
          onChangeText={(value: number) => setWeight(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t("editScreen.delete")}
          color="#ef5350"
          onPress={() => deleteFav()}
        />
        <Button title={t("editScreen.edit")} onPress={() => editFav()} />
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
