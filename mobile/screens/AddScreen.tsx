import { StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import { ButtonGroup } from '@rneui/themed';
import Preview from "../components/Camera/PhotoPreview";
import AddButtons from "../components/AddButtons/AddButtons";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AddScreenList from "../components/AddScreenLists/AddScreenList";
import { getFavMeals } from "../redux/favoritesSlice";
import { getMPMeals } from "../redux/mostPopularSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import axios from "axios";
import ActivityIndicator from "../elements/ActivityIndicator";
import { t } from "i18n-js";
import { useColorScheme } from "react-native";

export default function AddFormScreen(props: any) {
  const [screen, setScreen] = useState<string>("main");
  const [uri, setUri] = useState("");
  const [calories, setCalories] = useState(0);
  const [imageData, setImageData] = useState();
  const pickImage = async () => {
    setScreen("loading");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      base64: true,
    });
    if (!result.cancelled) {
      axios
        .post("https://w-maksim-aihrnabprzjvqez9.socketxp.com/picture", result)
        .then((res) => {
          console.log(res.data);
          setCalories(res.data.calories);
          // @ts-ignore
          setUri(result.uri);
          setScreen("preview");
        })
        .catch((er) => {
          console.log(er);
          setScreen("main");
        });
    } else {
      setScreen("main");
    }
  };


  const addMeal = () => {
    props.navigation.navigate("AddForm", { url: "HomeStack", calories: calories });
    setScreen("main");
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const close = () => {
    setScreen("main");
  };
  let meals= useAppSelector((state) => state.MPMeal.meals);
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
        close={close}
        retake={pickImage}
        addMeal={addMeal}
      />
    );
  } else if (screen === "loading") {
    return <ActivityIndicator text={t("addScreen.loader")} />;
  } else if (selectedIndex==0) {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <AddButtons
            AddFoodOnPress={() => props.navigation.navigate("AddForm",{category:props.route.params.category})}
            CameraOnPress={() => props.navigation.navigate("Camera")}
            LoadPhotoOnPress={() => pickImage()}
            navigation={props.navigation}
          />
        </View>
        <View>
          <ButtonGroup
            buttons={[t("navigation.favorites"),t("navigation.most_popular")]}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value);
            }}
            containerStyle={[styles.buttonGroup,{backgroundColor: Colors.dark.topSurface},{borderColor:Colors.dark.topSurface}]}
            selectedButtonStyle={[styles.selectedButton,{backgroundColor: Colors.dark.topSurface },{borderColor:Colors.dark.accent}]}
            selectedTextStyle={styles.selectedText}
            textStyle={styles.disabledText}
          />
        </View>
        <View style={styles.container2}>
          <FlatList
          data={meals0}
          renderItem={({ item }) => (
            <AddScreenList
              meal={item}
              ADDFoodOnPress={() => props.navigation.navigate("AddList",
              {
                name:item.meal_name,
                mealWeight:0,
                calories_on_100g:item.calories_on_100g,
                category:props.route.params.category}
                )}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      </View>
    );
  }
  else  {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <AddButtons
            AddFoodOnPress={() => props.navigation.navigate("AddForm",{category:props.route.params.category})}
            CameraOnPress={() => props.navigation.navigate("Camera")}
            LoadPhotoOnPress={() => pickImage()}
            navigation={props.navigation}
          />
        </View>
        <View>
          <ButtonGroup
            buttons={[t("navigation.favorites"),t("navigation.most_popular")]}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value);
            }}
            containerStyle={[styles.buttonGroup,{backgroundColor: Colors.dark.topSurface},{borderColor:Colors.dark.topSurface}]}
            selectedButtonStyle={[styles.selectedButton,{backgroundColor: Colors.dark.topSurface },{borderColor:Colors.dark.accent}]}
            selectedTextStyle={styles.selectedText}
            textStyle={styles.disabledText}
          />
        </View>
        <View style={styles.container2}>
          <FlatList
          data={meals}
          renderItem={({ item }) => (
            <AddScreenList
              meal={item}
              ADDFoodOnPress={() => props.navigation.navigate("AddList",
              {
                name:item.meal_name,
                calories_on_100g:item.calories_on_100g,
                mealWeight:item.proposed_meal_weight,
                category:props.route.params.category
              })}
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
    flex:2,
    marginTop:"-30%"
  },
  buttonGroup:{
    borderBottomWidth:0,
    marginHorizontal:0,
    height:"25%"
  },
  selectedButton:{
    borderBottomWidth:3,
    marginHorizontal:0,
    height:"25%"
  },
  selectedText: {
    fontSize: 15,
    color: Colors.dark.accent,
    textAlign: "left",
  },
  disabledText: {
    fontSize: 15,
    color: Colors.dark.textDark,
    textAlign: "left",
  },
});
