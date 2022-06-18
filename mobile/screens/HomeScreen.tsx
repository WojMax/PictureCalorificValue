import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { HomeTabScreenProps } from "../types";
import Button from "../elements/Button";
import t from "../services/translations";
import { useEffect, useState } from "react";
import axios from "axios";
import MealsHomeList from "../components/MealsHomeList/MealsHomeList";

type Meal = {
  calories: number;
  calories_on_100g: number;
  meal_name: string;
};

export default function HomeScreen(props: any) {
  const [meals, setMeals] = useState(Array<Meal>());

  /* useEffect(() => {
    axios
      .get(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/meals/15a227be-8a9e-438f-85b9-8abc7f6832bc"
      )
      .then((res) => {
        setMeals(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [props]);*/

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Button
          title={t("common.addProduct")}
          onPress={() => props.navigation.navigate("Add")}
        />
      </View>
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealsHomeList meal={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  container2: {
    alignItems: "center",
  },
});
