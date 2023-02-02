import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useState } from "react";
import t from "../services/translations";
import HttpApi from "../services/Api/HttpApi";

export default function EditFormScreen(props: any) {
  const [name, setName] = useState(
    props.route.params
      ? props.route.params.name
        ? props.route.params.name
        : ""
      : ""
  );
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories_on_100g
        ? props.route.params.calories_on_100g.toString()
        : ""
      : ""
  );

  const editFav = async () => {
    const meal = {
      mealID: props.route.params.mealID,
      mealName: name,
      caloriesOn100g: calories,
    };

    try {
      await HttpApi.post("favourites", meal);
      props.navigation.navigate("Favorites", {});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFav = async () => {
    const meal = {
      mealID: props.route.params.mealID,
    };

    try {
      const resp = await HttpApi.patch("favourites", { data: meal });
      console.log(resp);
      props.navigation.navigate("Favorites", {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={t("editScreen.name")}
          placeholder={props.route.params.name}
          value={name}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("editScreen.calories")}
          placeholder={props.route.params.calories_on_100g.toString()}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ margin: 5 }}>
          <Button
            title={t("editScreen.delete")}
            color="#ef5350"
            onPress={() => deleteFav()}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button title={t("editScreen.edit")} onPress={() => editFav()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingTop: 10,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
