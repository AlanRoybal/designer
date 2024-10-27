import '../gesture-handler';

import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './tabs/HomeScreen';

import { useColorScheme } from '@/hooks/useColorScheme';
import NotFoundScreen from './tabs/NotFound';
import { registerRootComponent } from 'expo';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={NotFoundScreen} name="./tabs/NotFound" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
