import { useEffect } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';

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
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
}
