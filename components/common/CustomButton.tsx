import { darkTheme } from '@/lib/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from '../themed/ThemedText';

type buttonProps = {
  onPress: () => void;
  text: string;
  icon?: React.ReactNode; 
  iconPosition?: 'left' | 'right'; 
  style?:ViewStyle
}

const CustomButton = ({ onPress, text, icon, iconPosition = 'left',style }: buttonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style,styles.confirmButton]}
    >
      <View style={styles.buttonContent}>
        {icon && iconPosition === 'left' && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        
        <ThemedText style={styles.confirmButtonText}>
          {text}
        </ThemedText>
        
        {icon && iconPosition === 'right' && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
      </View>
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
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8, // Space between icon and text (for left icon)
    marginLeft: 8,  // Space between text and icon (for right icon)
  },
  confirmButtonText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
