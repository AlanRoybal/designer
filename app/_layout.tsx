import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  useFonts,
  DMSans_400Regular as DMSans,
  Lexend_400Regular as Lexend
} from "@expo-google-fonts/dev";



export default function RootLayout() {

  const [loaded] = useFonts({
    DMSans,
    Lexend
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
    </Stack>
  );
}
