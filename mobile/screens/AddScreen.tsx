import { StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import { ButtonGroup } from "@rneui/themed";
import Preview from "../components/Camera/PhotoPreview";
import AddButtons from "../components/AddButtons/AddButtons";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import AddScreenList from "../components/AddScreenLists/AddScreenList";
import { getFavMeals } from "../redux/favoritesSlice";
import { getMPMeals } from "../redux/mostPopularSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import axios from "axios";
import ActivityIndicator from "../elements/ActivityIndicator";
import { t } from "i18n-js";
import useColorScheme from "../hooks/useColorScheme";
import PreviewError from "../components/Camera/PhotoPreviewError";

export default function AddFormScreen(props: any) {
  const [screen, setScreen] = useState<string>("main");
  const colorScheme = useColorScheme();
  const [uri, setPhoto] = useState("");
  const [calories, setCalories] = useState(0);
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState();

  const pickImage = async () => {
    setScreen("loading");
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (!photo.canceled) {
      setScreen("loading");
      try {
        setPhoto(photo.uri ? photo.uri : "");
        const response = await axios.post(
          "http://52.91.222.4/predict",
          photo.assets[0]
        );

        if (!response.data || response.data.category === null) {
          setScreen("error");
        } else {
          setCalories(response.data.calories);
          setName(response.data.category);
          setScreen("preview");
        }
      } catch (error) {
        setScreen("error");
        console.log(error);
      }
    } else {
      setScreen("main");
    }
  };

  const addMeal = () => {
    props.navigation.navigate("AddForm", {
      url: "HomeStack",
      name: name,
      calories: calories,
    });
    setScreen("main");
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const close = () => {
    setScreen("main");
  };
  let meals = useAppSelector((state) => state.MPMeal.meals);
  let meals0 = useAppSelector((state) => state.favMeal.meals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavMeals());
  }, [props]);

  useEffect(() => {
    dispatch(getMPMeals());
  }, [props]);

  if (screen == "preview") {
    return (
      <Preview
        uri={uri}
        calories={calories}
        name={name}
        close={close}
        retake={pickImage}
        addMeal={addMeal}
      />
    );
  } else if (screen == "error") {
    return (
      <PreviewError
        uri={uri}
        name={name}
        calories={calories}
        close={close}
        retake={pickImage}
        addMeal={addMeal}
      />
    );
  } else if (screen === "loading") {
    return <ActivityIndicator text={t("addScreen.loader")} />;
  } else if (selectedIndex == 0) {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <AddButtons
            AddFoodOnPress={() =>
              props.navigation.navigate("AddForm", {
                category: props.route.params.category,
              })
            }
            CameraOnPress={() =>
              props.navigation.navigate("Camera", {
                category: props.route.params.category,
              })
            }
            LoadPhotoOnPress={() => pickImage()}
            navigation={props.navigation}
          />
        </View>
        <View>
          <ButtonGroup
            buttons={[t("navigation.favorites"), t("navigation.most_popular")]}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value);
            }}
            containerStyle={[
              styles.buttonGroup,
              { backgroundColor: Colors[colorScheme].topSurface },
              { borderColor: Colors[colorScheme].topSurface },
            ]}
            selectedButtonStyle={[
              styles.selectedButton,
              { backgroundColor: Colors[colorScheme].topSurface },
              { borderColor: Colors[colorScheme].accent },
            ]}
            selectedTextStyle={[
              styles.selectedText,
              { color: Colors[colorScheme].accent },
            ]}
            textStyle={[
              styles.disabledText,
              { color: Colors[colorScheme].textDark },
            ]}
          />
        </View>
        <View style={styles.container2}>
          <FlatList
            data={meals0}
            renderItem={({ item }) => (
              <AddScreenList
                meal={item}
                ADDFoodOnPress={() =>
                  props.navigation.navigate("AddList", {
                    name: item.meal_name,
                    mealWeight: 0,
                    calories_on_100g: item.calories_on_100g,
                    category: props.route.params.category,
                  })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <AddButtons
            AddFoodOnPress={() =>
              props.navigation.navigate("AddForm", {
                category: props.route.params.category,
              })
            }
            CameraOnPress={() => props.navigation.navigate("Camera")}
            LoadPhotoOnPress={() => pickImage()}
            navigation={props.navigation}
          />
        </View>
        <View>
          <ButtonGroup
            buttons={[t("navigation.favorites"), t("navigation.most_popular")]}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value);
            }}
            containerStyle={[
              styles.buttonGroup,
              { backgroundColor: Colors[colorScheme].topSurface },
              { borderColor: Colors[colorScheme].topSurface },
            ]}
            selectedButtonStyle={[
              styles.selectedButton,
              { backgroundColor: Colors[colorScheme].topSurface },
              { borderColor: Colors[colorScheme].accent },
            ]}
            selectedTextStyle={[
              styles.selectedText,
              { color: Colors[colorScheme].accent },
            ]}
            textStyle={[
              styles.disabledText,
              { color: Colors[colorScheme].textDark },
            ]}
          />
        </View>
        <View style={styles.container2}>
          <FlatList
            data={meals}
            renderItem={({ item }) => (
              <AddScreenList
                meal={item}
                ADDFoodOnPress={() =>
                  props.navigation.navigate("AddList", {
                    name: item.meal_name,
                    calories_on_100g: item.calories_on_100g,
                    mealWeight: item.proposed_meal_weight,
                    category: props.route.params.category,
                  })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  container1: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container2: {
    flex: 2,
  },
  buttonGroup: {
    borderBottomWidth: 0,
    marginHorizontal: 0,
    marginTop: 0,
  },
  selectedButton: {
    borderBottomWidth: 3,
  },
  selectedText: {
    fontSize: 15,
    textAlign: "left",
  },
  disabledText: {
    fontSize: 15,
    textAlign: "left",
  },
});
