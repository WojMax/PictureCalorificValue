import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import t from "../services/translations";
import { useEffect, useState } from "react";
import axios from "axios";
import MealsFavouriteList from "../components/MealsFavouriteList/MealsFavouriteList";
import FloatingButton from "../elements/FloatingButton";

type Meal = {
  meal_name: string;
  calories: number;
  category: string;
};

export default function FavoritesScreen({ props, navigation }: any) {
  const [meals, setMeals] = useState(Array<Meal>());

  useEffect(() => {
    axios
      .get(
        "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/favourites/15a227be-8a9e-438f-85b9-8abc7f6832bc"
      )
      .then((res) => {
        setMeals(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [props]);
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <MealsFavouriteList
              meal={item}
              EditFoodOnPress={() =>
                navigation.navigate("Edit", {
                  name: item.meal_name,
                  calories: item.calories,
                  category: item.category,
                })
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.container3}>
          <FloatingButton
            onPress={() => navigation.navigate("AddFav")}
          ></FloatingButton>
        </View>
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
