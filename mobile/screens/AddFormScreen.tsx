import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";
import { getFavMeals } from "../redux/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import HttpApi from "../services/Api/HttpApi";
import { getHomeMeals } from "../redux/homeSlice";

export default function AddFormScreen(props: any) {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.homeMeal.date);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories
        ? props.route.params.calories.toString()
        : ""
      : ""
  );
  const [weight, setWeight] = useState(0);

  const save = async () => {
    //console.log(calories);
    const date = new Date(selectedDate);
    console.log(date);
    const meal = {
      mealName: name,
      caloriesOn100g: calories,
      mealWeight: weight,
      dateCreated:
        date.getUTCFullYear() +
        "-" +
        date.getUTCMonth() +
        "-" +
        date.getUTCDay(),
      category: props.route.params.category,
    };
    try {
      await HttpApi.put("meal", meal);
      dispatch(getHomeMeals(selectedDate));
      props.navigation.navigate("Home", {});
    } catch (error) {
      console.error(error);
    }
  };

  const saveFav = async () => {
    const mealFav = {
      mealName: name,
      caloriesOn100g: calories,
    };
    try {
      await HttpApi.put("favourites", mealFav);
      dispatch(getFavMeals());
    } catch (error) {
      console.error(error);
    }
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
        <View style={{ margin: 5 }}>
          <Button
            title={t("common.addFav")}
            disabled={!name || !calories}
            onPress={() => saveFav()}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button title={t("common.addProduct")} onPress={() => save()} />
        </View>
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
