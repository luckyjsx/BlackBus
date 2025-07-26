// ThemedComponents.tsx
import { useTheme } from '@/lib/theme';
import React from 'react';
import { View, ViewProps } from 'react-native';


export const ThemedView: React.FC<ViewProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <View
      style={[{ backgroundColor: theme.background,}, style]}
      {...props}
    />
  );
};


