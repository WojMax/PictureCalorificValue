import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../../components/Themed";
import Account from "../../components/Profile/Account";
import Weight from "../../components/Profile/Weight";
import User from "../../components/Profile/User";
import Objective from "../../components/Profile/Objective";
import { Dialog } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { getWeightList } from "../../redux/profileSlice";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { View as DefaultView } from "react-native";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import HttpApi from "../../services/Api/HttpApi";

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
      toggleWeightDialog();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getWeightList());
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerFullWidth}
        onPress={toggleWeightDialog}
      >
        <Weight />
      </TouchableOpacity>
      <View style={styles.containerFullWidth}>
        <View style={styles.containerFullWidth}>
          <Account />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("EditUser")}
          style={styles.containerFullWidth}
        >
          <User />
        </TouchableOpacity>
      </View>
      <View style={styles.containerFullWidth}>
        <Objective />
      </View>
      <Dialog
        isVisible={weightDialog}
        onBackdropPress={toggleWeightDialog}
        overlayStyle={{ backgroundColor: Colors[colorScheme].background }}
      >
        <Dialog.Title
          title="Add new weight record"
          titleStyle={{
            color: Colors[colorScheme].text,
          }}
        />
        <DefaultView style={{ height: 100, paddingTop: 10 }}>
          <Input
            label={"Weight"}
            placeholder={"Weight in kilograms"}
            keyboardType={"numeric"}
            onChangeText={(value: number) => setWeight(value)}
          />
        </DefaultView>
        <Dialog.Actions>
          <DefaultView style={{ paddingLeft: 5 }}>
            <Button
              title={"Continue"}
              disabled={!weight}
              onPress={() => saveWeight()}
            />
          </DefaultView>
          <Button
            title={"Cancel"}
            onPress={() => toggleWeightDialog()}
            color={Colors[colorScheme].background}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFullWidth: { flex: 1, flexDirection: "row" },
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
