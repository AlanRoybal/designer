import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./tabs/Home";
import Settings from "./tabs/Settings";
import Driving from "./tabs/Driving";
import Camera from "./tabs/Camera";
import { RootStackParamList } from "@/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Driving" component={Driving} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
  );
}
