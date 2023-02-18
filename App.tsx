import React, { useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import { ControlMenu } from "./components/ControlMenu";
import { ControlWindow } from "./components/CameraWindow";
import { useCameraPermissions } from "./hooks/useCameraPermissions";
import { test } from "./utils/tflite";

export default function App() {
  const [image, setImage] = useState(null);
  const cameraRef = useRef<any>();

  const { hasCameraPermission } = useCameraPermissions();

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef?.current?.takePictureAsync({
          quality: 1,
          base64: true,
          exif: false,
        });
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ControlWindow image={image} cameraRef={cameraRef} />

      <ControlMenu
        imageMode={!!image}
        savePicture={savePicture}
        takePicture={takePicture}
        onRetakeHandle={() => setImage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  topControls: {
    flex: 1,
  },
});
