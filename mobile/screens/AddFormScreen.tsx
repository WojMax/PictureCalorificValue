import { StyleSheet, ToastAndroid } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";
import { getFavMeals } from "../redux/favoritesSlice";
import { useAppDispatch } from "../hooks/useRedux";

export default function AddFormScreen(props: any) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories
        ? props.route.params.calories.toString()
        : ""
      : ""
  );
  const [weight, setWeight] = useState(0);

  const save = () => {
    console.log(calories);
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
    axios
      .put(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/meal",
        meal
      )
      .then((res) => {
        props.navigation.navigate("Home", {});
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const saveFav = async () => {
    console.log(calories);
    const mealFav = {
      userID: "15a227be-8a9e-438f-85b9-8abc7f6832bc",
      mealName: name,
      calories: calories,
      category: "breakfast",
    };
    await axios.put(
      "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/favourites",
      mealFav
    );
    dispatch(getFavMeals());
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={t("addScreen.name")}
          placeholder={t("addScreen.enterName")}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("addScreen.calories")}
          placeholder={t("addScreen.enterCalories")}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
        <Input
          label={t("addScreen.weight")}
          placeholder={t("addScreen.enterWeight")}
          keyboardType={"numeric"}
          onChangeText={(value: number) => setWeight(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t("common.addFav")}
          disabled={!name || !calories}
          onPress={() => saveFav()}
        />
        <Button title={t("common.addProduct")} onPress={() => save()} />
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
