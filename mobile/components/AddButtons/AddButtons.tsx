import {
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import Button from "../../elements/Button";
import { Text, View, useThemeColor } from "../Themed";
import Colors from "../../constants/Colors";
import { styles } from "./style.AddButtons";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import i18n from "i18n-js";
import t from "../../services/translations";

type Props = {
  AddFoodOnPress: () => void;
  CameraOnPress: () => void;
  navigation: any;
};

export default function AddButtons(props: Props) {
  const [image, setImage] = useState<string | undefined>();

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.surface },
    "background"
  );

  function showToast() {
    ToastAndroid.show(t("common.toast"), ToastAndroid.SHORT);
  }

  const closeCamera = () => {
    setImage(undefined);
  };

  const addMeal = () => {
    props.navigation.navigate("AddForm", { url: "HomeStack", calories: 294 });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    if (!image?.includes(".jpg") || image == "undefined") {
      showToast();
    }
  };

  if (image?.includes(".jpg") && image != "undefined") {
    return (
      <ImageBackground source={{ uri: image }} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.caloriesTopContainer} />
          <View style={styles.caloriesMidContainer}>
            <Text style={styles.text}>294 kcal/100g</Text>
          </View>
          <View style={styles.caloriesBottomContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title={t("camera.return")}
                onPress={closeCamera}
                color={"white"}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={t("camera.retakePhoto")}
                onPress={pickImage}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={t("common.addMeal")}
                onPress={addMeal}
                color={Colors.general.green}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
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
          onPress={pickImage}
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
