// theme.ts
import { useColorScheme } from 'react-native';

export const CommonColors = {
  white: '#ffffff',
  black: '#000000',
  pink: '#B9375D',
};

const LightTheme = {
  ...CommonColors,
  background: '#ffffff',
  text: '#000000',
  pressableBackground: '#D1D5DB',
  rippleEffect: '#EEEDEB',
};

const DarkTheme = {
  ...CommonColors,
  background: '#030014',
  text: '#ffffff',
  rippleEffect: '#1F1F1F',
};

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? DarkTheme : LightTheme;
}
