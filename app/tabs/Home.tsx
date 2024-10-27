import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

// <Button style={styles.start}/>
const Home = ({ navigation }: Props) => {
  return (
    <View>
      <Text style={styles.title}>Drivo</Text>
      <Text style={styles.text}>Ready to start driving?</Text>
      <TouchableHighlight
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.start}>START</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 96,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 66,
    color: "#433BFF",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text: {
    fontSize: 24,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 7,
    color: "#433BFF",
    fontWeight: "bold",
  },
  start: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 150,
    backgroundColor: "#433BFF",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: 111,
    paddingHorizontal: 77,
    fontSize: 40,
    color: "white",
    marginTop: 150,
    fontWeight: "bold",
  },
});
