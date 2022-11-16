import { View, Text } from "../Themed";
import listStyles from "./style.MealsHomeList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import Button from "../../elements/Button";
import t from "../../services/translations";
import { TouchableOpacity } from "react-native";

export type Meal = {
  id: number;
  meal_name: string;
  calories: number;
  calories_on_100g: number;
  meal_weight: number;
};

type Props = {
  meal: Meal;
  EditFoodOnPress: () => void;
};

export default function MealsHomeList({ meal, EditFoodOnPress }: Props) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={EditFoodOnPress}
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
          {meal.calories} Kcal
        </Text>
      </View>
    </TouchableOpacity>
  );
}
