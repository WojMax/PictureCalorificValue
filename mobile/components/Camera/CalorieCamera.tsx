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
import ActivityIndicator from "../../elements/ActivityIndicator";
import axios from "axios";
import PreviewError from "./PhotoPreviewError";
import { View as DefaultView } from "react-native";

export default function CalorieCamera(props: any) {
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

  const [screen, setScreen] = useState<string>("main");
  const [photo, setPhoto] = useState<string>();
  const [calories, setCalories] = useState(0);
  const [name, setName] = useState("");

  //check permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  }, []);

  const takePhoto = async () => {
    // @ts-ignore
    const photo = await camera.takePictureAsync({ base64: true });
    setScreen("loading");
    setPhoto(photo.uri);
    try {
      const response = await axios.post(
        "https://wojmax777-0hr199lpmuc56gt4.socketxp.com/predict",
        photo
      );
      if (response.data.category === null) {
        setScreen("error");
      } else {
        setCalories(response.data.calories);
        setName(response.data.category);
        setScreen("preview");
      }
    } catch (error) {
      retakePhoto();
      console.log(error);
    }
  };

  const retakePhoto = () => {
    setScreen("main");
  };

  const addMeal = () => {
    props.navigation.navigate("AddForm", {
      url: "HomeStack",
      name: name,
      calories: calories,
    });
  };

  const closeCamera = () => {
    props.navigation.pop();
  };

  if (hasPermission == null) {
    return <View />;
  } else if (!hasPermission) {
    return <ActivityIndicator />;
  } else if (screen == "loading") {
    return <ActivityIndicator text={"Calorie estimation is in progress..."} />;
  } else if (screen == "error") {
    return (
      <PreviewError
        uri={photo}
        name={name}
        calories={calories}
        close={closeCamera}
        retake={retakePhoto}
        addMeal={addMeal}
      />
    );
  } else if (screen == "preview") {
    return (
      <Preview
        uri={photo}
        name={name}
        calories={calories}
        close={closeCamera}
        retake={retakePhoto}
        addMeal={addMeal}
      />
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          ratio={"1:1"}
          type={type}
          flashMode={flash}
          ref={(ref: any) => {
            setCamera(ref);
          }}
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
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
