import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <ThemedView style={styles.container}>
        <ThemedText>This screen doesn&apos;t exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
