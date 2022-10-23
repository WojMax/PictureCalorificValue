import { StyleSheet, ToastAndroid } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";
import HttpApi from "../services/Api/HttpApi";

export default function AddFormScreen(props: any) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(
    props.route.params
      ? props.route.params.calories
        ? props.route.params.calories.toString()
        : ""
      : ""
  );
  const [category, setCategory] = useState("");

  const saveFav = async () => {
    const mealFav = {
      userID: "15a227be-8a9e-438f-85b9-8abc7f6832bc",
      mealName: name,
      calories: calories,
      category: "breakfast",
    };
    try {
      const resoult = await HttpApi.put("favourites", mealFav);
      console.log(resoult);
      props.navigation.navigate("Favorites", {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label={t("addScreen.name")}
          placeholder={t("addScreen.enterName")}
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          label={t("addScreen.calories")}
          placeholder={t("addScreen.enterCalories")}
          keyboardType={"numeric"}
          value={calories}
          onChangeText={(value: number) => setCalories(value)}
        />
        <Input
          label={t("addScreen.category")}
          placeholder={t("addScreen.enterCategory")}
          onChangeText={(value: string) => setCategory(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ margin: 5 }}>
          <Button title={t("common.addProduct")} onPress={() => saveFav()} />
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
