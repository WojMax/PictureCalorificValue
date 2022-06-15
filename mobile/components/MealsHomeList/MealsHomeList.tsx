import { View, Text } from "../Themed";
import listStyles from "./style.MealsHomeList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

type Meal = {
  calories: number;
  calories_on_100g: number;
  meal_name: string;
};

type Props = {
  meal: Meal;
};

export default function MealsHomeList({ meal }: Props) {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        listStyles.container,
        { borderColor: Colors[colorScheme].surface },
      ]}
    >
      <View>
        <View>
          <Text style={listStyles.nameText}>{meal.meal_name}</Text>
        </View>
        <View>
          <View style={listStyles.containerBottom}>
            <Text
              style={[
                listStyles.kcal100Text,
                { color: Colors[colorScheme].textDark },
              ]}
            >
              {meal.calories_on_100g} Kcal/100g
            </Text>
          </View>
        </View>
      </View>
      <View style={listStyles.containerCalories}>
        <Text
          style={[listStyles.calText, { color: Colors[colorScheme].textLight }]}
        >
          {meal.calories}
        </Text>
      </View>
    </View>
  );
}
