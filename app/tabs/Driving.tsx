import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Camera from "./Camera";
import type { Frame } from 'expo-camera';

type DrivingProps = NativeStackScreenProps<RootStackParamList, "Driving">;

const Driving = ({ route, navigation }: DrivingProps) => {
  const { outputStyle } = route.params;
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [trafficLightColor, setTrafficLightColor] = useState<string>("None");

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {}, [trafficLightColor]);

  const handleFrame = async (frame: Frame, prediction?: { traffic_light_color: string }) => {
    if (prediction) {
      if (prediction.traffic_light_color !== trafficLightColor) {
        setTrafficLightColor(prediction.traffic_light_color);
      }
    }
  };

  const getColorStyle = (color: string) => {
    switch (color.toLowerCase()) {
      case 'green':
        return styles.greenLight;
      case 'red':
        return styles.redLight;
      case 'yellow':
        return styles.yellowLight;
      default:
        return styles.noLight;
    }
  };

  const renderOutput = () => {
    switch (outputStyle) {
      case 'shapes':
        return (
          <View style={styles.shapesOutput}>
            <View style={[styles.trafficLight, getColorStyle(trafficLightColor)]} />
          </View>
        );
      
      case 'text':
        return (
          <View style={styles.textOutput}>
            <Text style={[styles.detectionText, getColorStyle(trafficLightColor)]}>
              Traffic Light: {trafficLightColor}
            </Text>
          </View>
        );
      
      case 'both':
        return (
          <View style={styles.bothOutput}>
            <View style={styles.detectionItem}>
              <View style={[styles.trafficLight, getColorStyle(trafficLightColor)]} />
              <Text style={styles.detectionText}>
                Traffic Light: {trafficLightColor}
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            setIsCameraActive(false);
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>End Drive</Text>
        </Pressable>
        
        <View style={[styles.verticalContainer, styles.output]}>
          {renderOutput()}
        </View>

        <View style={styles.cameraContainer}>
          <Camera 
            onFrame={handleFrame}
            isActive={isCameraActive}
            frameProcessingInterval={200}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  margin: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#433BFF",
    borderRadius: 15,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  output: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 12,
    borderColor: "#E9E9EC",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginVertical: 20,
    maxHeight: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    minHeight: 20,
    aspectRatio: 16/9,
  },
  shapesOutput: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  textOutput: {
    alignItems: 'center',
    gap: 5,
  },
  bothOutput: {
    alignItems: 'center',
    gap: 10,
  },
  shape: {
    alignItems: 'center',
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#433BFF',
    borderRadius: 8,
  },
  detectionText: {
    fontSize: 16,
    color: '#433BFF',
    fontWeight: '500',
  },
  detectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trafficLight: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#433BFF',
  },
  redLight: {
    backgroundColor: '#ff4444',
    borderColor: '#cc0000',
  },
  yellowLight: {
    backgroundColor: '#ffaa44',
    borderColor: '#cc7700',
  },
  greenLight: {
    backgroundColor: '#44ff44',
    borderColor: '#00cc00',
  },
  noLight: {
    backgroundColor: '#cccccc',
    borderColor: '#999999',
  },
});

export default Driving;
