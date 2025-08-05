// components/CustomLayout.tsx

import React, { ReactNode } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface ContentContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  safeAreaEdges?: Edge[]; // ['top', 'bottom', 'left', 'right']
  style?: StyleProp<ViewStyle>; // Style for SafeAreaView
  contentContainerStyle?: StyleProp<ViewStyle>; // Style for ScrollView or inner View
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  scrollable = false,
  safeAreaEdges = ['top', 'bottom'],
  style,
  contentContainerStyle,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={safeAreaEdges}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    padding:16
  },
  content: {
    flex: 1,
    // padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default ContentContainer;
