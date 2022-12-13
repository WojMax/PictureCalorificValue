import { StyleSheet, BackHandler } from "react-native";
import { Text, View } from "../../components/Themed";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import HttpApi from "../../services/Api/HttpApi";
import Colors from "../../constants/Colors";
import { Slider } from "@rneui/base";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import t from "../../services/translations";
import {
  getCaloricDemand,
  getProfile,
  getWeightList,
} from "../../redux/profileSlice";

export default function AddProfileScreen(props: any) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile.profile);
  const [age, setAge] = useState(profile?.age.toString() || 0);
  const [weight, setWeight] = useState(profile?.weight.toString() || 0);
  const [height, setHeight] = useState(profile?.height.toString() || 0);

  //dropdown
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(profile?.gender || null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const edit = async () => {
    try {
      const data = {
        gender: gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        activityID: 1, //profile?.activityID,
      };
      await HttpApi.post("profile", data);
      dispatch(getProfile());
      dispatch(getCaloricDemand());
      dispatch(getWeightList());
      props.navigation.navigate("Profile", {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label={"Age"}
        placeholder={"Age"}
        keyboardType={"numeric"}
        value={age}
        onChangeText={(value: number) => setAge(value)}
      />
      <Input
        label={"Weight"}
        placeholder={"Weight in kilograms"}
        keyboardType={"numeric"}
        value={weight}
        onChangeText={(value: number) => setWeight(value)}
      />
      <Input
        label={"Height"}
        placeholder={"Height in centimeters"}
        keyboardType={"numeric"}
        value={height}
        onChangeText={(value: number) => setHeight(value)}
      />
      <Text style={styles.activity}>Gender</Text>
      <DropDownPicker
        style={{
          backgroundColor: Colors[colorScheme].background,
          marginBottom: 10,
        }}
        textStyle={{
          color: Colors[colorScheme].text,
          fontSize: 18,
        }}
        placeholderStyle={{ color: Colors[colorScheme].textDark }}
        dropDownContainerStyle={{
          backgroundColor: Colors[colorScheme].topSurface,
        }}
        selectedItemLabelStyle={{ color: Colors[colorScheme].accent }}
        open={open}
        value={gender}
        items={items}
        setOpen={setOpen}
        setValue={setGender}
        setItems={setItems}
      />
      <View style={styles.buttonContainer}>
        <View style={{ margin: 5 }}>
          <Button
            title={"Save"}
            disabled={!age || !height || !weight || !gender}
            onPress={() => edit()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
