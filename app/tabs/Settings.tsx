import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { Car, MessageCircleMore, Blocks, ChevronLeft } from "lucide-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import React, { useState } from "react";

type SelectionOption = 'shapes' | 'text' | 'both' | null;

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const { width, height } = Dimensions.get("window");

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
        <View style={styles.selectionContainer}>
          <Pressable
            onPress={() => handleSelection('shapes')}
            style={[
              styles.selection,
              selectedOption === 'shapes' && styles.selectedButton
            ]}
          >
            <Blocks size={width * 0.12} color={selectedOption === 'shapes' ? "#433BFF" : "black"} />
            <Text style={[
              styles.buttonText,
              selectedOption === 'shapes' && styles.selectedText
            ]}>Colored Shapes</Text>
          </Pressable>
          
          <Pressable
            onPress={() => handleSelection('text')}
            style={[
              styles.selection,
              selectedOption === 'text' && styles.selectedButton
            ]}
          >
            <MessageCircleMore size={width * 0.12} color={selectedOption === 'text' ? "#433BFF" : "black"} />
            <Text style={[
              styles.buttonText,
              selectedOption === 'text' && styles.selectedText
            ]}>Text</Text>
          </Pressable>
          
          <Pressable
            onPress={() => handleSelection('both')}
            style={[
              styles.selection,
              selectedOption === 'both' && styles.selectedButton
            ]}
          >
            <Car size={width * 0.12} color={selectedOption === 'both' ? "#433BFF" : "black"} />
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
    paddingHorizontal: width * 0.05,
  },
  selectionContainer: {
    flexDirection: "column",
  },
  bottomBar: {
    backgroundColor: "#DEDCFF",
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header elements
  button: {
    backgroundColor: "#DEDCFF",
    padding: 10,
    borderRadius: 8,
    width: width * 0.15,
    marginTop: height * 0.07,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    paddingTop: height * 0.04,
    alignSelf: "flex-start",
  },
  subheading: {
    color: "gray",
    fontSize: width * 0.035,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingBottom: 25,
  },

  // Selection buttons
  selection: {
    backgroundColor: "#DEDCFF",
    borderWidth: 2,
    borderColor: "#DEDCFF",
    borderRadius: 12,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.03,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    borderColor: "#433BFF",
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
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
    paddingHorizontal: width * 0.12,
    paddingVertical: height * 0.02,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonPressed: {
    opacity: 0.8,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    color: "white",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  startButtonTextDisabled: {
    opacity: 0.7,
  },
});
