import { StyleSheet, BackHandler } from "react-native";
import { Text, View } from "../../components/Themed";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import HttpApi from "../../services/Api/HttpApi";
import { getCaloricDemand } from "../../redux/homeSlice";
import Colors from "../../constants/Colors";
import { Slider } from "@rneui/base";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import t from "../../services/translations";

export default function AddProfileScreen(props: any) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activityID, setActivityID] = useState(0);

  //dropdown
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const save = async () => {
    // try {
    //   const data = {
    //     gender: gender,
    //     age: age,
    //     height: height,
    //     weight: weight,
    //     activityID: activityID,
    //   };
    //   await HttpApi.post("profile", data);
    //   dispatch(getCaloricDemand());
    //   props.navigation.navigate("Home", {});
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <View style={styles.container}>
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
            onPress={() => save()}
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
