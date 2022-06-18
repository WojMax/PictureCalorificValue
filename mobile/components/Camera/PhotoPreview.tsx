import { ImageBackground } from "react-native";
import { Text, View } from "../Themed";
import Button from "../../elements/Button";
import { styles } from "./style.camera";
import Colors from "../../constants/Colors";
import { t } from "i18n-js";

type Props = {
  uri: string | undefined;
  calories: number;
  addMeal: () => void;
  close: () => void;
  retake: () => void;
};

export default function Preview(props: Props) {
  return (
    <ImageBackground source={{ uri: props.uri }} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.caloriesTopContainer} />
        <View style={styles.caloriesMidContainer}>
          <Text style={styles.text}>{props.calories} kcal/100g</Text>
        </View>
        <View style={styles.caloriesBottomContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={t("camera.return")}
              onPress={props.close}
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
              onPress={props.addMeal}
              color={Colors.general.green}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}