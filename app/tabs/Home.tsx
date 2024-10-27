import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drivo</Text>
      <Text style={styles.text}>Ready to start driving?</Text>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Settings")}
        underlayColor="#3524c6" // Darken on press for feedback
      >
        <Text style={styles.start}>START</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: width * 0.2, // Responsive font size
    textAlign: "center",
    color: "#433BFF",
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: height * 0.1, 
  },
  text: {
    fontSize: width * 0.06,
    textAlign: "center",
    color: "#433BFF",
    fontWeight: "bold",
    marginBottom: 250,
  },
  buttonContainer: {
    alignSelf: "center",
    width: width * 0.6,
    height: height * 0.1,
    backgroundColor: "#433BFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  start: {
    fontSize: width * 0.08,
    color: "white",
    fontWeight: "bold",
  },
});
