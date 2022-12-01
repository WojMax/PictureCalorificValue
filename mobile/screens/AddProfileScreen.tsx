import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Input from "../elements/Input";
import Button from "../elements/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import t from "../services/translations";
import { getFavMeals } from "../redux/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import HttpApi from "../services/Api/HttpApi";
import { getCaloricDemand, getHomeMeals } from "../redux/homeSlice";
import Colors from "../constants/Colors";
import { color, Slider } from "@rneui/base";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddProfileScreen(props: any) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activityID, setActivityID] = useState(0);

  const save = async () => {
    try {
      const data = {
        gender: "male",
        age: age,
        height: height,
        weight: weight,
        activityID: activityID,
      };
      console.log(data);
      await HttpApi.put("profile", data);
      dispatch(getCaloricDemand());
      props.navigation.navigate("Home", {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Calera</Text>
        <Text style={styles.description}>
          Provide your data that will allow us to calculate your daily calorie
          requirements.
        </Text>
      </View>
      <Input
        label={"Age"}
        placeholder={"Age"}
        keyboardType={"numeric"}
        onChangeText={(value: number) => setAge(value)}
      />
      <Input
        label={"Weight"}
        placeholder={"Weight in kilograms"}
        keyboardType={"numeric"}
        onChangeText={(value: number) => setWeight(value)}
      />
      <Input
        label={"Height"}
        placeholder={"Height in centimeters"}
        keyboardType={"numeric"}
        onChangeText={(value: number) => setHeight(value)}
      />
      <Text style={styles.activity}>Activity</Text>
      <Slider
        value={activityID}
        onValueChange={setActivityID}
        maximumValue={5}
        minimumValue={1}
        step={1}
        style={styles.slider}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: Colors.general.accent }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
        thumbProps={{
          children: (
            <MaterialIcons name="stop-circle" size={20} color="white" />
          ),
        }}
      />
      <View style={styles.activityVal}>
        <Text style={{ color: Colors[colorScheme].textDark }}>Sedentary</Text>
        <Text style={{ color: Colors[colorScheme].textDark }}>Very active</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Continue"}
          disabled={!age || !height || !weight}
          onPress={() => save()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: Colors.general.accent,
  },
  description: {
    fontSize: 14,
  },
  activity: {
    color: Colors.general.accentLight,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  activityVal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  slider: {
    color: Colors.general.accent,
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 10,
  },
});
