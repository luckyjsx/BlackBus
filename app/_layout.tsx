// app/_layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getItem } from '../lib/storage';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = (await getItem('hasOnboarded')) === 'true';
      if (hasOnboarded) {
        router.replace('/onboarding/selectLanguage');
      }
    };
    checkOnboarding();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
