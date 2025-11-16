import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="ask" options={{ title: 'Ask Question', headerBackTitle: 'Back' }} />
      <Stack.Screen name="answer" options={{ title: 'Legal Answer', headerBackTitle: 'Back' }} />
      <Stack.Screen name="categories" options={{ title: 'Legal Categories', headerBackTitle: 'Back' }} />
      <Stack.Screen name="legal-info" options={{ title: 'Legal Information', headerBackTitle: 'Back' }} />
    </Stack>
  );
}
