import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../../components/Themed";
import Account from "../../components/Profile/Account";
import Weight from "../../components/Profile/Weight";
import User from "../../components/Profile/User";
import Objective from "../../components/Profile/Objective";
import { Dialog } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import {
  getCaloricDemand,
  getProfile,
  getWeightList,
} from "../../redux/profileSlice";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { View as DefaultView } from "react-native";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import HttpApi from "../../services/Api/HttpApi";
import t from "../../services/translations";

export default function ProfileScreen(props: any) {
  const colorScheme = useColorScheme();

  const [weightDialog, setWeightDialog] = useState(false);
  const [weight, setWeight] = useState(0);

  const dispatch = useAppDispatch();

  const toggleWeightDialog = () => {
    setWeightDialog(!weightDialog);
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
        <View style={styles.containerFullWidth}>
          <Objective />
        </View>
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
});
