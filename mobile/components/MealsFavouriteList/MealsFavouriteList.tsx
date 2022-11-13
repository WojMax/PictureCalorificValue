import { View, Text } from "../Themed";
import listStyles from "./style.MealsFavouriteList";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import t from "../../services/translations";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Meal = {
  meal_name: string;
  calories_on_100g: number;
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
      <View>
        <View>
          <Text style={listStyles.nameText}>{meal.meal_name}</Text>
        </View>
        <View>
          <View style={listStyles.containerBottom}>
            <Text
              style={[
                listStyles.calText,
                { color: Colors[colorScheme].textDark },
              ]}
            >
              {meal.calories_on_100g} Kcal/100g
            </Text>
          </View>
        </View>
      </View>
      <View style={listStyles.containerCalories}>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textDark}
        />
      </View>
    </TouchableOpacity>
  );
}
