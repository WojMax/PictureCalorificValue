import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useEffect } from "react";
import MealsFavouriteList from "../components/MealsFavouriteList/MealsFavouriteList";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getFavMeals } from "../redux/favoritesSlice";
import Button from "../elements/Button";
import FloatingButton from "../elements/FloatingButton";

export default function FavoritesScreen(props: any) {
  let meals = useAppSelector((state) => state.favMeal.meals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavMeals());
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
                props.navigation.navigate("Edit", {
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
          <FloatingButton onPress={() => props.navigation.navigate("AddFav")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 9,
  },
  container3: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
