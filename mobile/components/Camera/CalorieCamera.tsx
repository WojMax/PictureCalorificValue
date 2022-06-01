import React, { useState, useEffect } from "react";
import { Text, View } from "../../components/Themed";
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

type Photo = {
  uri: string;
  height: number;
  width: number;
};

export default function CalorieCamera() {
  //permissions
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState();

  //screen ratio and padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<Photo>();

  const getSize = () => {
    return {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };
  };

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
  };

  if (hasPermission == null) {
    return <View />;
  } else if (!hasPermission) {
    return <Text>No access to camera</Text>;
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
