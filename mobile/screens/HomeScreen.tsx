import {
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import t from "../services/translations";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getHomeMeals } from "../redux/homeSlice";
import { getCaloricDemand } from "../redux/profileSlice";
import MealsHomeList from "../components/MealsHomeList/MealsHomeList";
import { LinearProgress } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import DateSlider from "../components/DateSlider/DateSlider";
import useColorScheme from "../hooks/useColorScheme";
import React from "react";
import { View as DefaultView } from "react-native";

export default function HomeScreen(props: any) {
  const colorScheme = useColorScheme();
  const meals = useAppSelector((state) => state.homeMeal.meals);
  const selectedDate = useAppSelector((state) => state.homeMeal.date);
  const caloriesCount = useAppSelector((state) => state.homeMeal.caloriesCount);
  const caloricDemand = useAppSelector((state) => state.profile.caloricDemand);

  // let progress = caloriesCount / dailyCalories;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedDate.length > 0) {
      dispatch(getHomeMeals(selectedDate));
      dispatch(getCaloricDemand());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (caloricDemand === -1) {
      props.navigation.navigate("AddProfile", {});
    }
  }, [caloricDemand]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container4,
          { backgroundColor: Colors[colorScheme].topSurface },
        ]}
      >
        <DateSlider />
        <DefaultView style={styles.container5}>
          <Text style={styles.progressText}>Progress</Text>
          <DefaultView style={styles.container7}>
            <Text style={styles.progressText}>
              {caloriesCount}/{caloricDemand}
            </Text>
          </DefaultView>
        </DefaultView>
        <LinearProgress
          style={styles.progressBar}
          value={caloriesCount / caloricDemand}
          variant="determinate"
          color={Colors[colorScheme].accent}
          trackColor={Colors[colorScheme].textLight}
        />
      </View>
      <View style={styles.container2}>
        <SectionList
          sections={[
            {
              title: t("categories.breakfast"),
              data: meals?.breakfast?.meals ? meals?.breakfast?.meals : [],
              calories: meals?.breakfast?.calories,
              category: "breakfast",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.lunch"),
              data: meals?.lunch?.meals ? meals?.lunch?.meals : [],
              calories: meals?.lunch?.calories,
              category: "lunch",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.dinner"),
              data: meals?.dinner?.meals ? meals?.dinner?.meals : [],
              calories: meals?.dinner?.calories,
              category: "dinner",
              add: t("common.addProduct"),
            },
            {
              title: t("categories.snack"),
              data: meals?.snacks?.meals ? meals?.snacks?.meals : [],
              calories: meals?.snacks?.calories,
              category: "snacks",
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
            <DefaultView>
              <DefaultView
                style={[
                  styles.container8,
                  {
                    backgroundColor: Colors[colorScheme].surface,
                  },
                ]}
              >
                <Text style={[styles.categoryText]}>{section.title}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    { color: Colors[colorScheme].textDark },
                  ]}
                >
                  {section.calories}
                </Text>
              </DefaultView>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Add", {
                    category: section.category,
                  })
                }
                style={[
                  styles.container9,
                  { borderBottomColor: Colors[colorScheme].surface },
                ]}
              >
                <DefaultView>
                  <Text
                    style={[
                      styles.addText,
                      { color: Colors[colorScheme].accent },
                    ]}
                  >
                    {section.add}
                  </Text>
                </DefaultView>
                <DefaultView>
                  <AntDesign name="plus" size={15} color={Colors.dark.accent} />
                </DefaultView>
              </TouchableOpacity>
            </DefaultView>
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
    paddingTop: 0,
  },
  container2: {
    flex: 9,
  },
  container3: {
    flex: 1,
    justifyContent: "center",
  },
  container4: {
    paddingTop: 42,
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
    borderBottomWidth: 1,
  },

  container9: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 6,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  progressBar: {
    marginVertical: 8,
    marginBottom: 20,
    justifyContent: "center",
    width: "100%",
  },
  progressText: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 20,
    textAlign: "left",
  },
  addText: {
    fontSize: 15,
    textAlign: "left",
  },
});
