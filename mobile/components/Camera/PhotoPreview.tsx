import { ImageBackground } from "react-native";
import { Text, View } from "../Themed";
import Button from "../../elements/Button";
import { styles } from "./style.camera";
import Colors from "../../constants/Colors";
import { t } from "i18n-js";

type Photo = {
  uri: string;
  height: number;
  width: number;
};

type Props = {
  photo?: Photo;
  img?: string | undefined;
  navigation: any;
  retake: () => void;
};

export default function Preview(props: Props) {
  const addMeal = () => {
    props.navigation.navigate("AddForm", { url: "HomeStack", calories: 123 });
  };
  var Photo = props.photo && props.photo.uri;
  const closeCamera = () => {
    props.navigation.pop();
  };
  if (props.photo == undefined) {
    Photo = props.img;
  }
  return (
    <ImageBackground source={{ uri: Photo }} style={styles.container}>
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
              onPress={props.retake}
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
