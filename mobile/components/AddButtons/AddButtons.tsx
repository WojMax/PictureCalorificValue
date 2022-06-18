import {
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import Button from "../../elements/Button";
import Preview from "../Camera/PhotoPreview";
import { Text, View, useThemeColor } from "../Themed";
import Colors from "../../constants/Colors";
import { styles } from "./style.AddButtons";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import t from "../../services/translations";

type Props = {
  AddFoodOnPress: () => void;
  CameraOnPress: () => void;
  LoadPhotoOnPress: () => void;
  navigation: any;
};

export default function AddButtons(props: Props) {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.View}>
        <TouchableOpacity
          style={[{ backgroundColor }, styles.Button]}
          onPress={props.CameraOnPress}
        >
          <MaterialIcons
            name="add-a-photo"
            size={40}
            color={Colors.general.accent}
            style={{ paddingBottom: 2.7 }}
          />
          <Text style={styles.Text}>{t("common.takePhoto")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.View}>
        <TouchableOpacity
          style={[{ backgroundColor }, styles.Button]}
          onPress={props.LoadPhotoOnPress}
        >
          <MaterialIcons
            name="add-photo-alternate"
            size={40}
            color={Colors.general.accent}
            style={{ paddingBottom: 2.7 }}
          />
          <Text style={styles.Text}>{t("common.addPhoto")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.View}>
        <TouchableOpacity
          style={[{ backgroundColor }, styles.Button]}
          onPress={props.AddFoodOnPress}
        >
          <Ionicons
            name="md-add-circle-sharp"
            size={40}
            color={Colors.general.accent}
          />
          <Text style={styles.Text}>{t("common.addMeal")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
