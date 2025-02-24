import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';  // Import Audio from expo-av
import Camera from './Camera'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import GreenLight from '../../assets/shapes/GreenLight';
import RedLight from '../../assets/shapes/RedLight';
import YellowLight from '../../assets/shapes/YellowLight';

type DrivingProps = NativeStackScreenProps<RootStackParamList, "Driving">;

const Driving = ({ route, navigation }: DrivingProps) => {
  const { outputStyle } = route.params;
  const [trafficLightColor, setTrafficLightColor] = useState<string>("None");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Function to play sound based on color
  const playSound = async (color: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        color === 'red'
          ? require('../../assets/audio/red.mp3')
          : color === 'yellow'
          ? require('../../assets/audio/yellow.mp3')
          : require('../../assets/audio/green.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Handle traffic light color detection from the Camera
  const handleTrafficLightDetected = (color: string) => {
    if (color !== trafficLightColor) {
      setTrafficLightColor(color);
      playSound(color.toLowerCase());
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload sound when the component unmounts
        }
      : undefined;
  }, [sound]);

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

  const renderShape = (color: string) => {
    switch (color.toLowerCase()) {
      case 'green':
        return (
          <GreenLight />
        );
      case 'red':
        return (
          <RedLight />
        );
      case 'yellow':
        return (
          <YellowLight />
        );
    }
  }

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
          <View style={{ width: "100%", height: "100%", justifyContent: "space-between" }}>
            <View style={{flex: 1, justifyContent: "center"}}>
              <Text style={{ display: "flex", fontFamily: "Lexend", fontSize: 60, color: "#000000", textAlign: "center" }}>{trafficLightColor.toUpperCase()}</Text>
            </View>
            {/* <View style={styles.detectionItem}>
              <View style={[styles.trafficLight, getColorStyle(trafficLightColor)]} />
            </View> */}
            <GreenLight/>
            {renderShape(trafficLightColor)}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.buttonText}>End Drive</Text>
      </Pressable>

      <View style={styles.output}>
        {renderOutput()}
      </View>
      <View style={styles.cameraContainer}>
        <Camera
          onTrafficLightDetected={handleTrafficLightDetected} // Pass the callback
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  margin: {
    flex: 1,
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 12
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
    // paddingVertical: 25,
    // paddingHorizontal: 15,
    marginVertical: 20,
    maxHeight: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    minHeight: 20,
    aspectRatio: 16 / 9,
    borderRadius: 20
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
