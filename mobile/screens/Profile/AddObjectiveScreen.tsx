import { StyleSheet, BackHandler, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import HttpApi from "../../services/Api/HttpApi";
import { getCaloricDemand } from "../../redux/profileSlice";
import Colors from "../../constants/Colors";
import { Slider } from "@rneui/base";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import t from "../../services/translations";

export default function AddProfileScreen(props: any) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const [goalweight, setGoalWeight] = useState(0);
  const [goalweightchange, setGoalWeightChange] = useState(0.1);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const save = async () => {
    try {
      const data = {
        gender: props.route.params.gender,
        age: props.route.params.age,
        height: props.route.params.height,
        weight: props.route.params.weight,
        activityID: props.route.params.activityID,
        goal_weight: goalweight,
        goal_weight_change: goalweightchange,
      };
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
        <Text style={styles.title}>{t("addProfile.objective")}</Text>
      </View>
      <Input
        label={t("addProfile.goalWeight")}
        placeholder={t("addProfile.weight_kg")}
        keyboardType={"numeric"}
        onChangeText={(value: number) => setGoalWeight(value)}
      />

      <View style={{ zIndex: -1 }}>
        <Text style={styles.activity}>{t("addProfile.goalWeightChange")}</Text>
        <Slider
          value={goalweightchange}
          onValueChange={setGoalWeightChange}
          maximumValue={1}
          minimumValue={0.1}
          step={0.1}
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
            {t("addProfile.goalWeightChange1")}
          </Text>
          <Text style={{ color: Colors[colorScheme].textDark }}>
            {t("addProfile.goalWeightChange2")}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={t("addProfile.continue")}
          disabled={!goalweight || !goalweightchange}
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
    marginBottom: 10,
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
