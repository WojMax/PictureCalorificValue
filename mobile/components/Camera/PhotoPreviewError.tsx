import { ImageBackground } from "react-native";
import { Text, View } from "../Themed";
import Button from "../../elements/Button";
import { styles } from "./style.camera";
import Colors from "../../constants/Colors";
import { t } from "i18n-js";

type Props = {
  uri: string | undefined;
  name: string;
  calories: number;
  addMeal: () => void;
  close: () => void;
  retake: () => void;
};

export default function PreviewError(props: Props) {
  return (
    <ImageBackground source={{ uri: props.uri }} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.caloriesTopContainer} />
        <View style={styles.caloriesErrorContainer}>
          <Text
            style={{
              fontSize: 22,
              color: "white",
              textAlign: "center",
            }}
          >
            {t("camera.notFood")}
          </Text>
          <Text
            style={{
              fontSize: 18,
              paddingTop: 10,
              color: "#bbb",
              textAlign: "center",
            }}
          >
            {t("camera.retakePls")}
          </Text>
        </View>
        <View style={styles.caloriesBottom2Container}>
          <View style={styles.button2Container}>
            <Button
              title={t("camera.return")}
              onPress={props.close}
              color={"white"}
              outline={true}
            />
          </View>
          <View style={styles.button2Container}>
            <Button
              title={t("camera.retakePhoto")}
              onPress={props.retake}
              outline={true}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
