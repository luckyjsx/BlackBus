import { useTheme } from '@/lib/theme';
import React from 'react';
import { Text, TextProps } from 'react-native';

export const ThemedText: React.FC<TextProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <Text style={[{ color: theme.text }, style]} {...props} />
  );
};