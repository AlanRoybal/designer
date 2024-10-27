import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import type { Frame } from 'expo-camera';

interface CameraProps {
  onFrame: (frame: Frame, prediction?: { traffic_light_color: string }) => void;
  isActive?: boolean;
  frameProcessingInterval?: number;
}

const SERVER_URL = 'http://10.184.91.55:5000/predict'; // Replace with your server IP

export default function Camera({ 
  onFrame, 
  isActive = true,
  frameProcessingInterval = 200 
}: CameraProps) {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const lastProcessedTime = useRef(0);
  const isMounted = useRef(true);
  const [processingFrame, setProcessingFrame] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const showError = (message: string) => {
    setError(message);
    Alert.alert('Camera Error', message);
  };

  const sendFrameToServer = async (frame: Frame) => {
    try {
      if (!frame) {
        throw new Error('Frame is undefined');
      }

      // Create form data
      const formData = new FormData();
      
      try {
        const frameData = frame.toString('base64');
        
        if (!frameData) {
          throw new Error('Frame conversion to base64 failed');
        }

        const blob = await fetch(`data:image/jpeg;base64,${frameData}`).then(r => r.blob());
        
        // Append the frame data
        formData.append('frame', blob, 'frame.jpg');
      } catch (conversionError) {
        throw new Error(`Frame conversion failed: ${conversionError.message}`);
      }

      const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const prediction = await response.json();
      return prediction;
    } catch (error) {
      showError(`Server communication error: ${error.message}`);
      return null;
    }
  };

  const frameProcessor = async (frame: Frame) => {
    if (!isMounted.current) {
      return;
    }
    
    if (!isActive) {
      return;
    }

    if (processingFrame) {
      return;
    }

    const currentTime = Date.now();
    if (currentTime - lastProcessedTime.current >= frameProcessingInterval) {
      try {
        setProcessingFrame(true);
        lastProcessedTime.current = currentTime;
        
        // Send frame to server and get prediction
        const prediction = await sendFrameToServer(frame);

        if (!isMounted.current) {
          return;
        }

        // Call onFrame with both the frame and prediction
        await onFrame(frame, prediction);
        
      } catch (error) {
        showError(`Frame processing error: ${error.message}`);
      } finally {
        if (isMounted.current) {
          setProcessingFrame(false);
        }
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  useEffect(() => {
    const checkPermission = async () => {
      if (!permission?.granted) {
        const result = await requestPermission();
      }
    };

    checkPermission();
  }, [permission, requestPermission]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        frameProcessor={isActive ? frameProcessor : undefined}
        frameProcessorFps={30}
        onError={(error) => {
          showError(`Camera error: ${error.message}`);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <View style={[
              styles.captureIndicator,
              isActive && styles.captureIndicatorActive,
              processingFrame && styles.captureIndicatorProcessing,
              error && styles.captureIndicatorError
            ]} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
})