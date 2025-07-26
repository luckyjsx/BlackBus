import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed/ThemedText';

type CustomPressableProps = {
  onPress: () => void;
  style?: object;
  textStyle?: object;
  image?: ImageSourcePropType;
  icon?: React.ReactNode;
  text?: string;
};

const CustomPressable = ({ onPress, style, text, image, icon, textStyle }: CustomPressableProps) => {
  return (
    <View style={[styles.wrapper]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'grey', radius: 200 }}
        style={styles.pressable}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {image && <Image source={image} style={{ width: 25, height: 25, margin: 10 }} />}
          <ThemedText style={textStyle ? textStyle : styles.text}>{text}</ThemedText>
        </View>
        {icon && <View style={{ marginLeft: 10 }}>{icon}</View>}
      </Pressable>
    </View>
  );
};

export default CustomPressable;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: 'hidden', // 🔒 This clips the ripple to rounded corners
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});
