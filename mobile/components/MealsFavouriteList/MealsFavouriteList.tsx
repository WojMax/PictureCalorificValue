import { View, Text } from "../Themed";
import Button from "../../elements/Button";
import listStyles from "./style.MealsFavouriteList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import t from "../../services/translations";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Meal = {
  meal_name: string;
  calories: number;
  category: string;
};

type Props = {
  meal: Meal;
  EditFoodOnPress: () => void;
};

export default function MealsFavouriteList({ meal, EditFoodOnPress }: Props) {
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
                listStyles.calText,
                { color: Colors[colorScheme].textDark },
              ]}
            >
              {meal.calories} Kcal/100g
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={EditFoodOnPress}
        style={listStyles.containerCalories}
      >
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textDark}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
