import { darkTheme } from '@/lib/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed/ThemedText';

type buttonProps = {
  onPress: () => void;
  text: string,
}

const CustomButton = ({ onPress, text }: buttonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.confirmButton}
    >
      <ThemedText style={styles.confirmButtonText}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: darkTheme.pink,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },

  confirmButtonText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
})