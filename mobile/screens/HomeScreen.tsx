import {
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../elements/Button";
import t from "../services/translations";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getHomeMeals } from "../redux/homeSlice";
import MealsHomeList from "../components/MealsHomeList/MealsHomeList";
import { LinearProgress } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { TabItem } from "@rneui/base/dist/Tab/Tab.Item";

export type Meal = {
  id: number;
  calories: number;
  calories_on_100g: number;
  meal_name: string;
  meal_weight: number;
  category: string;
};

export default function HomeScreen(props: any) {
  let meals = useAppSelector((state) => state.homeMeal.meals);
  let dailyCalories = 2540;
  let caloriesCount = 0;
  let breakfastCalories = 0;
  let breakfastMeals: Meal[] = [];
  let lunchCalories = 0;
  let lunchMeals: Meal[] = [];
  let dinnerCalories = 0;
  let dinnerMeals: Meal[] = [];
  let snackCalories = 0;
  let snackMeals: Meal[] = [];

  meals.forEach((item) => {
    caloriesCount += item.calories;
    if (item.category == "breakfast") {
      breakfastCalories += item.calories;
      breakfastMeals.push(item);
    }
    if (item.category == "lunch") {
      lunchCalories += item.calories;
      lunchMeals.push(item);
    }
    if (item.category == "dinner") {
      dinnerCalories += item.calories;
      dinnerMeals.push(item);
    }
    if (item.category == "snack") {
      snackCalories += item.calories;
      snackMeals.push(item);
    }
  });

  let progress = caloriesCount / dailyCalories;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHomeMeals());
  }, [props]);

  return (
    <View style={styles.container}>
      <View style={styles.container4}>
        <Text style={styles.progressText}>Progress</Text>
        <View style={styles.container5}>
          <View style={styles.container6}>
            <LinearProgress
              style={{ marginVertical: 10 }}
              value={progress}
              variant="determinate"
              color={Colors.dark.accent}
              trackColor={Colors.dark.accent}
            />
          </View>
          <View style={styles.container7}>
            <Text style={styles.progressText}>
              {caloriesCount}/{dailyCalories}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <SectionList
          sections={[
            {
              title: t("categories.breakfast"),
              data: breakfastMeals,
              calories: breakfastCalories,
              category: "breakfast",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.lunch"),
              data: lunchMeals,
              calories: lunchCalories,
              category: "lunch",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.dinner"),
              data: dinnerMeals,
              calories: dinnerCalories,
              category: "dinner",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.snack"),
              data: snackMeals,
              calories: snackCalories,
              category: "snack",
              add: t("common.addProduct"),
            },
          ]}
          renderItem={({ item }) => (
            <MealsHomeList
              meal={item}
              EditFoodOnPress={() =>
                props.navigation.navigate("Edit", {
                  mealID: item.id,
                  name: item.meal_name,
                  weight: item.meal_weight,
                  calories_on_100g: item.calories_on_100g,
                  calories: item.calories,
                })
              }
            />
          )}
          renderSectionHeader={({ section }) => (
            <View>
              <View style={styles.container8}>
                <Text style={styles.categoryText}>{section.title}</Text>
                <Text style={styles.categoryText}>{section.calories}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Add", {
                    category: section.category,
                  })
                }
                style={styles.container9}
              >
                <View>
                  <Text style={styles.addText}>{section.add}</Text>
                </View>
                <View>
                  <AntDesign name="plus" size={15} color={Colors.dark.accent} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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
  container4: {
    paddingTop: 30,
    paddingRight: 10,
    paddingLeft: 10,
  },
  container5: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  container6: {
    paddingTop: 8.5,
  },
  container7: {
    paddingLeft: 5,
  },
  container8: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 6,
    paddingRight: 6,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.general.cameraGray,
    borderBottomWidth: 1,
  },

  container9: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
  },

  progressText: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 20,
    color: Colors.dark.textLight,
    textAlign: "left",
  },
  addText: {
    fontSize: 15,
    color: Colors.dark.accent,
    textAlign: "left",
  },
});
