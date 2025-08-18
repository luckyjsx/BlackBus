// app/_layout.tsx
import { getItem } from '@/lib/storage';
import { useTheme } from '@/lib/theme';
import { userStore } from '@/store/userStore';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const router = useRouter();
  const theme = useTheme(); 
  const colorScheme = useColorScheme();
  const { isAuthenticated} = userStore()
  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = (await getItem('hasOnboarded')) === 'true';
      console.log("laxman...",hasOnboarded)
      if (hasOnboarded) {
        router.replace('/onboarding/selectLanguage');
      }
    };
    checkOnboarding();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
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
