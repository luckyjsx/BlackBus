// app/onboarding/_layout.tsx
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        
      }}
    >
      <Stack.Screen
        name="selectLanguage"
        options={{ title: 'Welcome' }}
      />
    </Stack>
  );
}
