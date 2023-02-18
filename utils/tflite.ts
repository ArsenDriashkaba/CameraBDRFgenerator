import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

export const test = async () => {
  await tf.ready();
  console.log("TF Lite is ready");
};
