import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

type DrivingProps = NativeStackScreenProps<RootStackParamList, "Driving">;

const Driving = ({ route }: DrivingProps) => {
  const { outputStyle } = route.params;

  return (
    <View style={styles.container}>
      <Text>Driving Screen Here</Text>
      <Text>{outputStyle}</Text>
        
    </View>
  );
};

export default Driving;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
  },
});