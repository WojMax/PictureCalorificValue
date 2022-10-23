import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import t from "../services/translations";
import { useEffect, useState } from "react";
import axios from "axios";
import MealsHomeList from "../components/MealsHomeList/MealsHomeList";
import HttpApi from "../services/Api/HttpApi";

type Meal = {
  calories: number;
  calories_on_100g: number;
  meal_name: string;
  mealWeight: number;
  navigation: any;
};

export default function HomeScreen(props: any) {
  const [meals, setMeals] = useState(Array<Meal>());

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await HttpApi.get(
          "meals",
          "15a227be-8a9e-438f-85b9-8abc7f6832bc"
        );
        setMeals(result.data);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [props]);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <MealsHomeList
              meal={item}
              EditFoodOnPress={() =>
                props.navigation.navigate("Edit", {
                  name: item.meal_name,
                  weight: item.mealWeight,
                  calories: item.calories_on_100g,
                })
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.container3}>
        <Button
          title={t("common.addProduct")}
          onPress={() => props.navigation.navigate("Add")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  container2: {
    flex: 9,
  },
  container3: {
    flex: 1,
    justifyContent: "center",
  },
});
