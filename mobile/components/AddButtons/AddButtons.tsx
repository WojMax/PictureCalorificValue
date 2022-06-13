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
    ToastAndroid.show("Please choose an image", ToastAndroid.SHORT);
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
                title={"Return"}
                onPress={closeCamera}
                color={"white"}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={"Rechoose photo"}
                onPress={pickImage}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={"Add meal"}
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
          <Text style={styles.Text}>Take photo</Text>
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
          <Text style={styles.Text}>Add photo</Text>
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
          <Text style={styles.Text}>Add meal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
