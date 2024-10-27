import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { CarFront, ChevronRight } from "lucide-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={styles.textContainer}>
        <CarFront style={styles.carIcon} size={64} />
        <Text style={styles.header}>
          Keep your driving safe
        </Text>
        <Text style={styles.text}>
          No need to keep questioning the color of the light. Let our app take care of it for you.
        </Text>
      </View>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Settings")}
        underlayColor="#3524c6" // Darken on press for feedback
      >
        <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
          <Text style={styles.start}>Get Started</Text>
          <ChevronRight style={styles.chevronIcon} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
    backgroundColor: "#f8f8f8",
    gap: 30
  },
  title: {
    fontSize: width * 0.2, // Responsive font size
    textAlign: "center",
    color: "#433BFF",
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: height * 0.1,
  },
  textContainer: {
    paddingHorizontal: 5,
    gap: 10
  },
  carIcon: {
    color: "#433BFF"
  },
  header: {
    fontSize: 60,
    fontFamily: "Lexend",
    color: "#433BFF"
  },
  text: {
    fontSize: 24,
    color: "#646873",
    fontFamily: "DMSans",
  },
  buttonContainer: {
    backgroundColor: "#433BFF",
    width: "100%",
    height: "auto",
    paddingHorizontal: 13,
    paddingVertical: 14,
    borderRadius: 16,
  },
  start: {
    fontSize: width * 0.08,
    color: "white",
    fontFamily: "Get Started"
  },
  chevronIcon: {
    color: "#ffffff"
  }
});
