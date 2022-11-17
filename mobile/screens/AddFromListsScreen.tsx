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

export default function AddFromListsScreen(props: any) {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.homeMeal.date);

  const [name, setName] = useState<string>(
    props.route.params
      ? props.route.params.name
        ? props.route.params.name.toString()
        : ""
      : ""
  );
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories_on_100g
        ? props.route.params.calories_on_100g.toString()
        : ""
      : ""
  );

  const [weight, setWeight] = useState<number>(
    props.route.params
      ? props.route.params.mealWeight
        ? props.route.params.mealWeight.toString()
        : ""
      : ""
  );

  const save = async () => {
    //console.log(calories);
    const date = new Date(selectedDate);
    const transformedDate =
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getDate();
    const meal = {
      mealName: name,
      caloriesOn100g: calories,
      mealWeight: weight,
      dateCreated: transformedDate,
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={t("addScreen.name")}
          placeholder={props.route.params.name}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("addScreen.calories")}
          placeholder={props.route.params.calories_on_100g.toString()}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
        <Input
          label={t("addScreen.weight")}
          placeholder={props.route.params.mealWeight.toString()}
          keyboardType={"numeric"}
          onChangeText={(value: number) => setWeight(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
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
