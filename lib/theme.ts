// theme.ts
import { useColorScheme } from 'react-native';

const LightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const DarkTheme = {
  background: '#000000',
  text: '#ffffff',
};

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? DarkTheme : LightTheme;
}
