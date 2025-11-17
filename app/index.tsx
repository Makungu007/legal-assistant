import { useEffect } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  useEffect(() => {
    // Navigate to welcome screen for initial user experience
    // In production, check authentication status here
    const timer = setTimeout(() => {
      router.push('/(auth)/welcome' as any);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
