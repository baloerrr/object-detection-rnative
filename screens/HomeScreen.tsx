import * as React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProps } from "../types/NavigationTypes";

type Props = NavigationProps<'Home'>;

export default function HomeScreen({navigation}: Props) {
  // const navigate = useNavigation()
    
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function openCamera() {
    setCameraOpen(true)
  }

  function closeCamera() {
    setCameraOpen(false)
  }

  return (
    <View style={styles.container}>
      {cameraOpen && (
        <Camera
          style={styles.camera}
          type={type}
          onCameraReady={() => console.log("Camera is ready")}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={closeCamera}>
              <Text style={styles.text}>Close Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {!cameraOpen && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")}>
            <Text style={styles.text}>About</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "blue",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
