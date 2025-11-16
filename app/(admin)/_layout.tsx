import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Admin Access', headerBackTitle: 'Back' }} />
      <Stack.Screen name="documents" options={{ title: 'Manage Documents', headerBackTitle: 'Back' }} />
      <Stack.Screen name="categories" options={{ title: 'Manage Categories', headerBackTitle: 'Back' }} />
    </Stack>
  );
}
