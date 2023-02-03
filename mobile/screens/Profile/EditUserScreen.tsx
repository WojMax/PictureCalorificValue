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

  const [activityID, setActivityID] = useState(1);
  var arr = ["Sedentary","Lighty active","Moderately active","Active","Very active"]
  function getIndex(exercise:any) {
    return arr.findIndex(obj => obj === exercise)+1;
  }
  console.log(profile?.exercise.toString())

  //dropdown
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(profile?.gender || null);
  const [items, setItems] = useState([
    { label: t("profile.male"), value: "male" },
    { label: t("profile.female"), value: "female" },
  ]);

  const edit = async () => {
    try {
      const data = {
        gender: gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        activityID: activityID,
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
        label={t("profile.age")}
        placeholder={t("profile.age")}
        keyboardType={"numeric"}
        value={age}
        onChangeText={(value: number) => setAge(value)}
      />
      <Input
        label={t("profile.weight_1")}
        placeholder={t("profile.weight_kg")}
        keyboardType={"numeric"}
        value={weight}
        onChangeText={(value: number) => setWeight(value)}
      />
      <Input
        label={t("profile.height")}
        placeholder={t("profile.height_cm")}
        keyboardType={"numeric"}
        value={height}
        onChangeText={(value: number) => setHeight(value)}
      />
      <Text style={styles.activity}>{t("profile.gender")}</Text>
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
      <View style={{ zIndex: -1 }}>
        <Text style={styles.activity}>{t("addProfile.activity")}</Text>
        <Slider
          value={getIndex(profile?.exercise)}
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
          <Text style={{ color: Colors[colorScheme].textDark }}>
            {t("addProfile.activity_sed")}
          </Text>
          <Text style={{ color: Colors[colorScheme].textDark }}>
            {t("addProfile.activity_act")}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ margin: 5 }}>
          <Button
            title={t("profile.save")}
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
    paddingTop: 20,
  },
});
