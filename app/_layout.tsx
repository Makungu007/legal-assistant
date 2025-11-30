import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { Provider as PaperProvider, MD3LightTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

import { useColorScheme } from 'react-native';
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === 'dark' ? PaperDarkTheme : PaperLightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Entry point */}
            <Stack.Screen name="index" />
            
            {/* Auth Flow */}
            <Stack.Screen name="(auth)" />
            
            {/* Main App Flow */}
            <Stack.Screen name="(main)" />
            
            {/* Admin Flow */}
            <Stack.Screen name="(admin)" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
