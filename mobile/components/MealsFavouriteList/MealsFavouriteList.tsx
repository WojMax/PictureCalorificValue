import { View, Text } from "../Themed";
import Button from "../../elements/Button";
import listStyles from "./style.MealsFavouriteList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import t from "../../services/translations";

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
                listStyles.category,
                { color: Colors[colorScheme].textDark },
              ]}
            >
              Category: {meal.category}
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
      <View style={listStyles.containerCalories}>
        <Button title={t("editScreen.edit")} onPress={EditFoodOnPress}></Button>
      </View>
    </View>
  );
}
