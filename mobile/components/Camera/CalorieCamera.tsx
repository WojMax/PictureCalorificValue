import React, { useState, useEffect } from "react";
import { Text, View } from "../Themed";
import {
  Dimensions,
  Platform,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { styles } from "./style.camera";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonBasic from "../../elements/ButtonBasic";
import Colors from "../../constants/Colors";

type Photo = {
  uri: string;
  height: number;
  width: number;
};

type Props = {
  navigation: any;
};

export default function CalorieCamera(props: Props) {
  //permissions
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState();
  //screen ratio and padding
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<Photo>();
  const [calories, setCalories] = useState(0);

  //check permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  }, []);

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const prepareRatio = async () => {
    if (Platform.OS === "android") {
      // @ts-ignore
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = [];
      let realRatios = [];
      let minDistance = null;

      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;

        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      setRatio(minDistance);
      setIsRatioSet(true);
    }
  };

  const takePhoto = async () => {
    // @ts-ignore
    const photo = await camera.takePictureAsync();
    setPhoto(photo);
    setCalories(123);
    setShowPreview(true);
  };

  const retakePhoto = () => {
    setShowPreview(false);
  };

  const addMeal = () => {
    props.navigation.navigate("AddForm", { url: "HomeStack" });
  };

  const closeCamera = () => {
    props.navigation.pop();
  };

  if (hasPermission == null) {
    return <View />;
  } else if (!hasPermission) {
    return <Text>No access to camera</Text>;
  } else if (showPreview) {
    return (
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.caloriesTopContainer} />
          <View style={styles.caloriesMidContainer}>
            <Text style={styles.text}>{calories} kcal/100g</Text>
          </View>
          <View style={styles.caloriesBottomContainer}>
            <View style={styles.buttonContainer}>
              <ButtonBasic
                title={"Return"}
                onPress={closeCamera}
                color={"white"}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonBasic
                title={"Retake photo"}
                onPress={retakePhoto}
                outline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonBasic
                title={"Add meal"}
                onPress={addMeal}
                color={Colors.general.green}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          onCameraReady={setCameraReady}
          ratio={ratio}
          type={type}
          ref={(ref: any) => {
            setCamera(ref);
          }}
          style={styles.container}
        >
          <View style={styles.container}>
            <View style={styles.topContainer} />
            <View style={styles.bottomContainer}>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="flip-camera-android"
                      size={28}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.takePhotoButton}
                  onPress={takePhoto}
                />
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <TouchableOpacity>
                    <MaterialIcons name="flash-on" size={28} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Camera>
      </SafeAreaView>
    );
  }
}
