import React, { useState, useEffect } from "react";
import { Text, View } from "../Themed";
import {
  Dimensions,
  Platform,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Preview from "./PhotoPreview";
import { Camera } from "expo-camera";
import { styles } from "./style.camera";
import { MaterialIcons } from "@expo/vector-icons";
import t from "../../services/translations";

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
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<string>();
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
    setPhoto(photo.uri);
    setCalories(123);
    setShowPreview(true);
  };

  const retakePhoto = () => {
    setShowPreview(false);
  };

  const addMeal = () => {
    props.navigation.navigate("AddForm", { url: "HomeStack", calories: 123 });
  };

  const closeCamera = () => {
    props.navigation.pop();
  };

  if (hasPermission == null) {
    return <View />;
  } else if (!hasPermission) {
    return <Text>{t("camera.noAccess")}</Text>;
  } else if (showPreview) {
    return (
      <Preview
        uri={photo}
        calories={123}
        close={closeCamera}
        retake={retakePhoto}
        addMeal={addMeal}
      />
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          onCameraReady={setCameraReady}
          ratio={ratio}
          type={type}
          flashMode={flash}
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
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
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
                  <TouchableOpacity
                    onPress={() => {
                      setFlash(
                        flash === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.torch
                          : Camera.Constants.FlashMode.off
                      );
                    }}
                  >
                    {flash === Camera.Constants.FlashMode.off ? (
                      <MaterialIcons name="flash-off" size={28} color="white" />
                    ) : (
                      <MaterialIcons name="flash-on" size={28} color="white" />
                    )}
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
