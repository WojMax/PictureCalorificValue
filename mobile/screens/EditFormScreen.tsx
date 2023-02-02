import { StyleSheet, ToastAndroid } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";
import HttpApi from "../services/Api/HttpApi";
import { getHomeMeals } from "../redux/homeSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

export default function EditFormScreen(props: any) {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.homeMeal.date);

  const [name, setName] = useState(
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
      ? props.route.params.weight
        ? props.route.params.weight.toString()
        : ""
      : ""
  );

  const editHome = async () => {
    //console.log(calories);
    const meal = {
      mealID: props.route.params.mealID,
      mealName: name,
      caloriesOn100g: Number(calories),
      mealWeight: Number(weight),
    };
    try {
      //console.log(meal)
      await HttpApi.post("meal", meal);
      dispatch(getHomeMeals(selectedDate));
      props.navigation.navigate("Home", {});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHome = async () => {
    //console.log(calories);
    const meal = {
      mealID: props.route.params.mealID,
    };
    try {
      //console.log(meal)
      const resp = await HttpApi.patch("meal", { data: meal });
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
          label={t("editScreen.name")}
          placeholder={props.route.params.name}
          value={name}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("editScreen.calories_on_100g")}
          placeholder={props.route.params.calories_on_100g.toString()}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
        <Input
          label={t("editScreen.weight")}
          placeholder={props.route.params.weight.toString()}
          onChangeText={(value: number) => setWeight(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ margin: 5 }}>
          <Button
            title={t("editScreen.delete")}
            color="#ef5350"
            onPress={() => deleteHome()}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button title={t("editScreen.edit")} onPress={() => editHome()} />
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
