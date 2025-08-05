// theme.ts
import { useColorScheme } from "react-native";
import {
  MD3Theme,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from "react-native-paper";

type CustomTheme = MD3Theme & {
  background: string;
  text: string;
  pressableBackground: string;
  rippleEffect: string;
  pink: string;
  lightSilver: string;
  placeholder?: string;
  link?:string
};

export const lightTheme: CustomTheme = {
  ...PaperLightTheme,
  background: "#ffffff",
  text: "#000000",
  pressableBackground: "#D1D5DB",
  rippleEffect: "#EEEDEB",
  pink: "#B9375D",
  lightSilver: "#D1D5DB",
  placeholder: '#ADAFBB',
  link:"blue",
  colors: {
    ...PaperLightTheme.colors,
    background: "#ffffff",
    onBackground: "#000000",
  },
};

export const darkTheme: CustomTheme = {
  ...PaperDarkTheme,
  background: "#030014",
  text: "#ffffff",
  pressableBackground: "#1F1F1F",
  rippleEffect: "#1F1F1F",
  pink: "#B9375D",
  lightSilver: "#D1D5DB",
  placeholder: "#ADAFBB",
  link:"#B9375D",
  colors: {
    ...PaperDarkTheme.colors,
    background: "#030014",
    onBackground: "#ffffff",
  },
};

export function useTheme(): CustomTheme {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
}
