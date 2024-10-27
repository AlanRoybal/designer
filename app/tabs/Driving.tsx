import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

type DrivingProps = NativeStackScreenProps<RootStackParamList, "Driving">;

const Driving = ({ route, navigation }: DrivingProps) => {
  const { outputStyle } = route.params;

  const getOutput = () => {
    // shapes, text, both
    return outputStyle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>End Drive</Text>
        </Pressable>
        <View style={[styles.verticalContainer, styles.output]}>
          <Text>{getOutput()}</Text>
        </View>
      </View>
    </View>
  );
};

export default Driving;

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
    maxHeight: 475,
    alignItems: "center",
    justifyContent: "center",
  },
});