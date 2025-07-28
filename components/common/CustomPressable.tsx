import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../themed/ThemedText';
import { ThemedView } from '../themed/ThemedView';

type CustomPressableProps = {
    onPress: () => void;
    style?: object;
    image?: ImageSourcePropType;
    icon?: React.ReactNode;
    text?: string
}

const CustomPressable = ({ onPress, style, text, image,icon }: CustomPressableProps) => {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: 'grey', radius: 200 }}
            style={style ? [styles.pressable, style] : styles.pressable}
        >
            {
                image && <Image source={image} style={{ width: 25, height: 25, margin: 10 }} />
            }
            <ThemedText style={styles.text}>{text}</ThemedText>
            {icon && <ThemedView style={{ marginLeft: 10 }}>{icon}</ThemedView>}
        </Pressable>
    )
}

export default CustomPressable

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        padding: 10,
    }

})