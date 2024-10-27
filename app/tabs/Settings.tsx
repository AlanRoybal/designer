import { StyleSheet, Text, View, Pressable } from "react-native";
import { Car, MessageCircleMore, Blocks, ChevronLeft } from "lucide-react";
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
            <Blocks style={[
              styles.icon,
              selectedOption === 'shapes' && styles.selectedIcon
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
            <MessageCircleMore style={[
              styles.icon,
              selectedOption === 'text' && styles.selectedIcon
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
            <Car style={[
              styles.icon,
              selectedOption === 'both' && styles.selectedIcon
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
  container: {
    flex: 1,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "433BFF"
    // You might want to adjust text/icon colors for selected state
  },
  selectedIcon: {
    color: "white",
  },
  selectedText: {
    color: "white",
  },
  startButtonDisabled: {
    backgroundColor: "#433BFF",
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
  startButtonContainer: {
    backgroundColor: "#433BFF",
    borderRadius: 15,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginVertical: 30,
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
  },
  margin: {
    margin: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    alignItems: "center",
    alignSelf: "flex-start",
    paddingTop: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#DEDCFF",
    padding: 10,
    borderRadius: 8,
    width: 60,
    // marginTop: 20,
    // Add any other box styling you want
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.5, // Optional: gives visual feedback when pressed
  },
  subheading: {
    flex: 1,
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingBottom: 25,
  },
  selection: {
    borderWidth: 2,
    borderColor: '#DEDCFF',
    flex: 1,
    backgroundColor: "#DEDCFF",
    borderRadius: 12,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",

    marginVertical: 20,
  },
  bottomBar: {
    backgroundColor: "#DEDCFF",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonPressed: {
    opacity: 0.8,
  },
  startButton: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#433BFF",
    marginVertical: 30,
  },
  icon: {
    backgroundColor: "transparent",
    color: "black",
    width: 48,
    height: 48,
  },
  arrow: {
    backgroundColor: "transparent",
    color: "black",
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
