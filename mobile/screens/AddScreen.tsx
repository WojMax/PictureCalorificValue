import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Preview from "../components/Camera/PhotoPreview";
import { HomeTabScreenProps } from "../types";
import AddButtons from "../components/AddButtons/AddButtons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImagePickerCancelledResult } from "expo-image-picker";
import axios from "axios";
//import ImageResizer from "react-native-image-resizer";

export default function AddFormScreen({ navigation }: any) {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [uri, setUri] = useState("");
  const [imageData, setImageData] = useState();

  //w tej funkcji działaj wszystkie ruchy dozwolone
  const pickImage = async () => {
    let resoult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      base64: true, ///na razie tak działa wysyłanie trzeb kombinować ze zmniejszeniem bloba albo FormData
    });

    console.log(resoult);

    //ta biblioteka nie działa jak coś już ci mówię
    // // @ts-ignore
    // let res = await ImageResizer.createResizedImage(
    //   // @ts-ignore
    //   "data:image/png" + JSON.stringify(resoult.base64),
    //   600,
    //   400,
    //   "JPEG",
    //   60,
    //   0
    // );
    //

    //wysyłanie na serwer podstawiaj w resoult nie dostaniesz za dużo w odpowiedzi i tak xD
    axios
      .post("https://w-maksim-te6it8o1971pd5y4.socketxp.com/picture", resoult)
      .then((res) => {
        console.log("**********************************");
        console.log(res.data);
      })
      .catch((er) => console.log(er));
  };

  const addMeal = () => {
    navigation.navigate("AddForm", { url: "HomeStack", calories: "123" });
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <Preview
        uri={uri}
        calories={123}
        close={close}
        retake={pickImage}
        addMeal={addMeal}
      />
    );
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
