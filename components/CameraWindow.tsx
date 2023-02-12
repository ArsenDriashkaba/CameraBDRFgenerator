import { Camera, AutoFocus, CameraType, FlashMode } from "expo-camera";
import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "./Button";

type Props = {
  image: any;
  cameraRef: any;
};

export const ControlWindow = ({ image, cameraRef }: Props) => {
  const [flash, setFlash] = useState(FlashMode.off);
  const [type, setType] = useState(CameraType.back);

  return !image ? (
    <Camera
      style={styles.camera}
      type={type}
      ref={cameraRef}
      flashMode={flash}
      autoFocus={AutoFocus.on}
    >
      <View style={styles.cameraWindow}>
        <Button
          title=""
          icon="retweet"
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
        <Button
          onPress={() =>
            setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
          }
          icon="flash"
          color={flash === FlashMode.off ? "gray" : "#fff"}
        />
      </View>
    </Camera>
  ) : (
    <Image source={{ uri: image }} style={styles.camera} />
  );
};

const styles = StyleSheet.create({
  cameraWindow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
});
