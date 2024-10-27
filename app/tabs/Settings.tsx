import { StyleSheet, Text, View, Pressable } from "react-native";
import { Car, MessageCircleMore, Blocks, ChevronLeft } from "lucide-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import React, { useState } from "react";

type SelectionOption = 'shapes' | 'text' | 'both' | null;

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
const Settings = ({ navigation }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectionOption>(null);

  const handleSelection = (option: SelectionOption) => {
    setSelectedOption(option);
  };

  const handleStartDriving = () => {
    if (selectedOption) {
      navigation.navigate("Driving", { outputStyle: selectedOption });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("Home")}
          >
            <ChevronLeft style={styles.arrow} />
          </Pressable>
          <Text style={styles.title}>Choose your output style!</Text>
          <Text style={styles.subheading}>Required to pick one</Text>
        </View>
        <View>
          <Pressable
            onPress={() => handleSelection('shapes')}
            style={[
              styles.selection,
              styles.verticalContainer,
              selectedOption === 'shapes' && styles.selectedButton
            ]}
          >
            <Blocks size={48} style={[
              selectedOption === 'shapes'
            ]} />
            <Text style={[
              styles.buttonText,
              selectedOption === 'shapes' && styles.selectedText
            ]}>Colored Shapes</Text>
          </Pressable>
          
          <Pressable
            onPress={() => handleSelection('text')}
            style={[
              styles.selection,
              styles.verticalContainer,
              selectedOption === 'text' && styles.selectedButton
            ]}
          >
            <MessageCircleMore size={48} style={[
              selectedOption === 'text'
            ]} />
            <Text style={[
              styles.buttonText,
              selectedOption === 'text' && styles.selectedText
            ]}>Text</Text>
          </Pressable>
          
          <Pressable
            onPress={() => handleSelection('both')}
            style={[
              styles.selection,
              styles.verticalContainer,
              selectedOption === 'both' && styles.selectedButton
            ]}
          >
            <Car size={48} style={[
              selectedOption === 'both'
            ]} />
            <Text style={[
              styles.buttonText,
              selectedOption === 'both' && styles.selectedText
            ]}>Both</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <Pressable 
          style={({ pressed }) => [
            styles.startButtonContainer,
            !selectedOption && styles.startButtonDisabled,
            pressed && styles.startButtonPressed
          ]}
          onPress={handleStartDriving}
          disabled={!selectedOption}
        >
          <Text style={[
            styles.startButtonText,
            !selectedOption && styles.startButtonTextDisabled
          ]}>
            Start Driving
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
    // Layout containers
    container: {
      flex: 1,
    },
    margin: {
      flex: 1,
      margin: 20,
    },
    verticalContainer: {
      flex: 1,
      flexDirection: "column",
    },
    bottomBar: {
      backgroundColor: "#DEDCFF",
      height: 120,
      justifyContent: "center",
      alignItems: "center",
    },
  
    // Header elements
    button: {
      backgroundColor: "#DEDCFF",
      padding: 10,
      borderRadius: 8,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonPressed: {
      opacity: 0.5,
    },
    title: {
      fontSize: 24,
      alignSelf: "flex-start",
      paddingTop: 30,
      fontWeight: "bold",
    },
    subheading: {
      color: "gray",
      fontSize: 14,
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingTop: 5,
      paddingBottom: 25,
    },
  
    // Selection buttons
    selection: {
      flex: 1,
      backgroundColor: "#DEDCFF",
      borderWidth: 2,
      borderColor: "#DEDCFF",
      borderRadius: 12,
      paddingVertical: 25,
      paddingHorizontal: 15,
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedButton: {
      borderColor: "#433BFF",
    },
    buttonText: {
      fontSize: 20,
      color: "black",
      fontWeight: "bold",
    },
    selectedText: {
      color: "#433BFF",
    },
  
    // Icons
    arrow: {
      width: 24,
      height: 24,
    },
  
    // Start button
    startButtonContainer: {
      backgroundColor: "#433BFF",
      borderRadius: 15,
      paddingHorizontal: 50,
      paddingVertical: 15,
      marginVertical: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    startButton: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    startButtonPressed: {
      opacity: 0.8,
    },
    startButtonDisabled: {
      opacity: 0.5,
    },
    startButtonText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    startButtonTextDisabled: {
      opacity: 0.7,
    },
});
