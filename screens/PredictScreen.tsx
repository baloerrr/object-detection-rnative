import React, { useState, useEffect } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as tf from "@tensorflow/tfjs";
import * as cocoModel from "@tensorflow-models/coco-ssd";
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';


export default function PredictScreen() {
  const [image, setImage] = useState("");
  const [objects, setObjects] = useState<cocoModel.DetectedObject[]>();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState<cocoModel.ObjectDetection>()

  useEffect(() => {
      tf.ready().then(() => {
        loadModel()
      })
  }, []);

  const loadModel = async() => {
    try {
      const dataset = await cocoModel.load()
      setModel(dataset)
    } catch (error) {
      console.log(error);
      
    }
  }

 
  const detectObject = async (uri: any) => {
  //   const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64})
  //   const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
  //   const raw = new Uint8Array(imgBuffer)
  //   let imgTensor = decodeJpeg(raw)
  //   const scalar = tf.scalar(255)
  // //resize the image
  //   imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [300, 300])

  
  const predictions = await model?.detect(uri)
  setObjects(predictions)
  console.log(predictions);
  };

  const pickImageCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
    }
  };

  const pickImageGallery = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      detectObject(result.assets[0].uri)
    }
  };

  console.log(objects);
  

  return (
    <View style={styles.container}>
       {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick with Camera" onPress={pickImageCamera} />
      <Button title="Pick with Galery" onPress={pickImageGallery} />

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  objectContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
