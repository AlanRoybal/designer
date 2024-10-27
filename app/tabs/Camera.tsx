import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface CameraProps {
  onTrafficLightDetected: (color: string) => void;
}

export default function Camera({ onTrafficLightDetected }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    const interval = setInterval(captureAndSendImage, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function captureAndSendImage() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        exif: false,  // Disable EXIF data to potentially reduce processing time
        imageType: 'jpg', // Usually smaller than PNG
        quality: 0.5,    // Reduce quality to speed up processing
        skipProcessing: true, // Skip additional processing
        // This is the key part for disabling shutter sound
        mute: true
      });
      
      if (photo?.base64) {
        sendImageToBackend(photo.base64);
      }
    }
  }

  async function sendImageToBackend(base64Image: string) {
    try {
      const response = await fetch('http://172.20.10.6:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await response.json();
      if (data.color) {
        onTrafficLightDetected(data.color);
      }
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        // Add these props to help disable sound and optimize performance
        enableShutterSound={false}
        mute={true}
        videoStabilizationMode="off"
        // Optimize camera settings for faster capture
        preset="low"
        focusDepth={1}
        zoom={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 200,
    aspectRatio: 16/9,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  colorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});