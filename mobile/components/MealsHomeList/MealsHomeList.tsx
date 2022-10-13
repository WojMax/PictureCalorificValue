import { View, Text } from "../Themed";
import listStyles from "./style.MealsHomeList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import Button from "../../elements/Button";
import t from "../../services/translations";
import { TouchableOpacity } from "react-native";

type Meal = {
  calories: number;
  calories_on_100g: number;
  meal_name: string;
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
      <TouchableOpacity onPress={EditFoodOnPress}>
        <TouchableOpacity onPress={EditFoodOnPress}>
          <Text style={listStyles.nameText}>{meal.meal_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={EditFoodOnPress}>
          <TouchableOpacity
            onPress={EditFoodOnPress}
            style={listStyles.containerBottom}
          >
            <Text
              style={[
                listStyles.kcal100Text,
                { color: Colors[colorScheme].textDark },
              ]}
            >
              {meal.calories_on_100g} Kcal/100g
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={EditFoodOnPress}
        style={listStyles.containerCalories}
      >
        <Text
          style={[listStyles.calText, { color: Colors[colorScheme].textLight }]}
        >
          {meal.calories} Kcal
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
