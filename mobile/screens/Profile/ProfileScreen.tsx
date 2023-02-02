import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text,View } from "../../components/Themed";
import Account from "../../components/Profile/Account";
import Weight from "../../components/Profile/Weight";
import User from "../../components/Profile/User";
import Objective from "../../components/Profile/Objective";
import { Dialog } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  getCaloricDemand,
  getProfile,
  getWeightList,
} from "../../redux/profileSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@rneui/base";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { View as DefaultView } from "react-native";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import HttpApi from "../../services/Api/HttpApi";
import t from "../../services/translations";

export default function ProfileScreen(props: any) {
  const colorScheme = useColorScheme();
  const weightchange = useAppSelector((state) => state.profile.profile?.goal_weight_change)
  const [weightDialog, setWeightDialog] = useState(false);
  const [weight, setWeight] = useState(0);
  const [goalDialog, setGoalDialog] = useState(false);
  const [goalweight, setGoalWeight] = useState(0);
  const [goalweightchange, setGoalWeightChange] = useState(weightchange);

  const dispatch = useAppDispatch();

  const toggleWeightDialog = () => {
    setWeightDialog(!weightDialog);
  };
  const toggleGoalDialog = () => {
    setGoalDialog(!goalDialog);
  };

  const saveWeight = async () => {
    try {
      const data = { weight: weight, date: new Date() };
      await HttpApi.put("weight", data);
      dispatch(getWeightList());
      dispatch(getProfile());
      dispatch(getCaloricDemand());
      toggleWeightDialog();
    } catch (error) {
      console.error(error);
    }
  };
  const saveGoal = async () => {
    try {
      const data = { goal_weight: goalweight, goal_weight_change: goalweightchange };
      await HttpApi.post("goal", data);
      dispatch(getWeightList());
      dispatch(getProfile());
      dispatch(getCaloricDemand());
      toggleGoalDialog();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getWeightList());
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={{ height: 250 }} onPress={toggleWeightDialog}>
          <Weight />
        </TouchableOpacity>
        <View style={styles.containerFullWidth}>
          <View style={styles.containerHalfWidth}>
            <Account />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("EditUser")}
            style={styles.containerHalfWidth}
          >
            <User />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.containerFullWidth} onPress={toggleGoalDialog}>
          <Objective />
        </TouchableOpacity>
      </ScrollView>

      <Dialog
        isVisible={weightDialog}
        onBackdropPress={toggleWeightDialog}
        overlayStyle={{ backgroundColor: Colors[colorScheme].background }}
      >
        <Dialog.Title
          title={t("profile.addNewWeight")}
          titleStyle={{
            color: Colors[colorScheme].text,
          }}
        />
        <DefaultView style={{ height: 100, paddingTop: 10 }}>
          <Input
            label={t("profile.weight_1")}
            placeholder={t("profile.weight_kg")}
            keyboardType={"numeric"}
            onChangeText={(value: number) => setWeight(value)}
          />
        </DefaultView>
        <Dialog.Actions>
          <DefaultView style={{ paddingLeft: 5 }}>
            <Button
              title={t("profile.continue")}
              disabled={!weight}
              onPress={() => saveWeight()}
            />
          </DefaultView>
          <Button
            title={t("profile.cancel")}
            onPress={() => toggleWeightDialog()}
            color={Colors[colorScheme].background}
          />
        </Dialog.Actions>
      </Dialog>

      <Dialog
        isVisible={goalDialog}
        onBackdropPress={toggleGoalDialog}
        overlayStyle={{ backgroundColor: Colors[colorScheme].background }}
      >
        <Dialog.Title
          title={t("addProfile.editGoal")}
          titleStyle={{
            color: Colors[colorScheme].text,
          }}
        />
        <DefaultView style={{ height: 180, paddingTop: 10 }}>
          <Input
            label={t("addProfile.goalWeight")}
            placeholder={t("addProfile.weight_kg")}
            keyboardType={"numeric"}
            onChangeText={(value: number) => setGoalWeight(value)}
          />
          <View >
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
        </DefaultView>
        <Dialog.Actions>
          <DefaultView style={{ paddingLeft: 5}}>
            <Button
              title={t("profile.continue")}
              disabled={!goalweight}
              onPress={() => saveGoal()}
            />
          </DefaultView>
          <Button
            title={t("profile.cancel")}
            onPress={() => toggleGoalDialog()}
            color={Colors[colorScheme].background}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerFullWidth: {
    flexDirection: "row",
    height: 200,
  },
  containerHalfWidth: {
    height: 200,
    width: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
    marginBottom: 10
  },
  slider: {
    color: Colors.general.accent,
    marginHorizontal: 10,
  },
});
