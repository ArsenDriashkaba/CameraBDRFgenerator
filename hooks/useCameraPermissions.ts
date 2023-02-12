import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

export const useCameraPermissions = () => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  return {
    hasCameraPermission,
    setHasCameraPermission,
  };
};
