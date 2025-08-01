// app/_layout.tsx
import { useTheme } from '@/lib/theme';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { getItem } from '../lib/storage';

export default function RootLayout() {
  const router = useRouter();
  const theme = useTheme(); 
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
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
