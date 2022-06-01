import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { styles } from "./style.camera";

export default function CalorieCamera() {
  //permissions
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);

  //screen ratio and padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

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

  if (hasPermission == null) {
    return <Text>No access to camera</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View>
      <Camera
        onCameraReady={setCameraReady}
        ratio={ratio}
        type={Camera.Constants.Type.back}
        ref={(ref: any) => {
          setCamera(ref);
        }}
      >
        <View style={getSize()} />
      </Camera>
    </View>
  );
}
