import { TouchableOpacity } from "react-native";
import { Text, View, useThemeColor } from "../Themed";
import Colors from "../../constants/Colors";
import { styles } from "./style.AddButtons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import t from "../../services/translations";
import { useColorScheme } from "react-native";

type Props = {
  AddFoodOnPress: () => void;
  CameraOnPress: () => void;
  LoadPhotoOnPress: () => void;
  navigation: any;
};

export default function AddButtons(props: Props) {
  const backgroundColor = useThemeColor(
    { light: Colors.light.topSurface, dark: Colors.dark.topSurface },
    "background"
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.View}>
        <TouchableOpacity
          style={[{ backgroundColor }, styles.Button]}
          onPress={props.LoadPhotoOnPress}
        >
          <MaterialIcons
            name="add-photo-alternate"
            size={38}
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
            size={38}
            color={Colors.general.accent}
          />
          <Text style={styles.Text}>{t("common.addMeal")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.View}>
        <TouchableOpacity
          style={[{ backgroundColor }, styles.Button]}
          onPress={props.CameraOnPress}
        >
          <MaterialIcons
            name="add-a-photo"
            size={38}
            color={Colors.general.accent}
            style={{ paddingBottom: 2.7 }}
          />
          <Text style={styles.Text}>{t("common.takePhoto")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
