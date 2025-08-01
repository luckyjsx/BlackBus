import { ThemedText } from '@/components/themed/ThemedText';
import { useTheme } from '@/lib/theme';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThemedView } from '../themed/ThemedView';

type CustomPressableProps = {
    onPress: () => void;
    isActive?: boolean;
    style?: object;
    image?: any;
    icon?: React.ReactNode;
    text?: string;
};

const CustomPressable = ({ onPress, style, text, image, icon, isActive }: CustomPressableProps) => {
    const theme = useTheme();
    return (
        <ThemedView style={[styles.wrapper, style, { backgroundColor: theme.background, borderColor: isActive ? theme.pink : theme.lightSilver }]}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: theme.rippleEffect }}
            >
                <View style={styles.row}>
                    {image && <Image source={image} style={styles.image} />}
                    <ThemedText style={styles.text}>{text}</ThemedText>
                    {icon}
                </View>
            </Pressable>
        </ThemedView>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        flex: 1,
    },
});


export default CustomPressable;