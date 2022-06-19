import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Preview from "../components/Camera/PhotoPreview";
import AddButtons from "../components/AddButtons/AddButtons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "axios";
import ActivityIndicator from "../elements/ActivityIndicator";
import { t } from "i18n-js";

export default function AddFormScreen({ navigation }: any) {
  const [screen, setScreen] = useState<string>("main");
  const [uri, setUri] = useState("");
  const [calories, setCalories] = useState(0);
  const [imageData, setImageData] = useState();

  const pickImage = async () => {
    setScreen("loading");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      base64: true,
    });
    if (!result.cancelled) {
      axios
        .post("https://w-maksim-aihrnabprzjvqez9.socketxp.com/picture", result)
        .then((res) => {
          console.log(res.data);
          setCalories(res.data.calories);
          // @ts-ignore
          setUri(result.uri);
          setScreen("preview");
        })
        .catch((er) => {
          console.log(er);
          setScreen("main");
        });
    } else {
      setScreen("main");
    }
  };

  const addMeal = () => {
    navigation.navigate("AddForm", { url: "HomeStack", calories: calories });
    setScreen("main");
  };

  const close = () => {
    setScreen("main");
  };

  if (screen == "preview") {
    return (
      <Preview
        uri={uri}
        calories={calories}
        close={close}
        retake={pickImage}
        addMeal={addMeal}
      />
    );
  } else if (screen === "loading") {
    return <ActivityIndicator text={t("addScreen.loader")} />;
  } else {
    return (
      <View style={styles.container}>
        <AddButtons
          AddFoodOnPress={() => navigation.navigate("AddForm")}
          CameraOnPress={() => navigation.navigate("Camera")}
          LoadPhotoOnPress={() => pickImage()}
          navigation={navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
