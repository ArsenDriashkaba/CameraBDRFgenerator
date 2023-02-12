import { View, StyleSheet } from "react-native";
import { Button } from "./Button";

type Props = {
  imageMode: boolean;
  savePicture: () => void;
  takePicture: () => void;
  onRetakeHandle: () => void;
};

export const ControlMenu = ({
  imageMode,
  savePicture,
  takePicture,
  onRetakeHandle,
}: Props) => {
  return (
    <View style={styles.controls}>
      {imageMode ? (
        <View style={styles.buttonContainer}>
          <Button title="Re-take" onPress={onRetakeHandle} icon="retweet" />
          <Button title="Save" onPress={savePicture} icon="check" />
        </View>
      ) : (
        <Button title="Take a picture" onPress={takePicture} icon="camera" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flex: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
});
