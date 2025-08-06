// components/ReusableBottomSheet.tsx
import { useTheme } from '@/lib/theme';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, {
    ReactNode,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export interface ReusableBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
    hideSheet?: boolean;
    index?: number;
    outsidePresBehaviour?: BackdropPressBehavior;
    onChange?: (index: number) => void;
    animationConfigs?: BottomSheetProps['animationConfigs'];
    showBackDrop?: boolean;
    hideIndicator?: boolean;
    style?:ViewStyle
}

export interface ReusableBottomSheetRef {
    expand: () => void;
    close: () => void;
    snapToIndex: (index: number) => void;
}

const CustomBottomSheet = forwardRef<ReusableBottomSheetRef, ReusableBottomSheetProps>(
    (
        {
            children,
            snapPoints = ['50%'],
            hideSheet = true,
            index = -1,
            outsidePresBehaviour,
            onChange,
            animationConfigs,
            showBackDrop = true,
            hideIndicator = false,
            style
        },
        ref
    ) => {
        const theme = useTheme();
        const sheetRef = useRef<BottomSheet>(null);

        // Animated indicator state
        const indicatorHeight = useSharedValue(hideIndicator ? 0 : 6);
        const indicatorOpacity = useSharedValue(hideIndicator ? 0 : 1);

        // Animate indicator when hideIndicator prop changes
        useEffect(() => {
            indicatorHeight.value = withTiming(hideIndicator ? 0 : 6, { duration: 200 });
            indicatorOpacity.value = withTiming(hideIndicator ? 0 : 1, { duration: 200 });
        }, [hideIndicator]);

        const animatedHandleStyle = useAnimatedStyle(() => {
            return {
                height: indicatorHeight.value,
                opacity: indicatorOpacity.value,
                backgroundColor: theme.pink,
            } as ViewStyle;
        });

        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior={outsidePresBehaviour}
                />
            ),
            [outsidePresBehaviour]
        );

        // Expose imperative methods with debugging logs
        useImperativeHandle(ref, () => ({
            expand: () => {
                console.log('CustomBottomSheet.expand called');
                sheetRef.current?.expand();
            },
            close: () => {
                console.log('CustomBottomSheet.close called');
                sheetRef.current?.close();
            },
            snapToIndex: (index: number) => {
                console.log('CustomBottomSheet.snapToIndex called with index:', index);
                sheetRef.current?.snapToIndex(index);
            },
        }));

        return (
            <BottomSheet
                enableDynamicSizing={false}
                ref={sheetRef}
                index={index}
                snapPoints={snapPoints}
                enablePanDownToClose={hideSheet}
                backdropComponent={showBackDrop ? renderBackdrop : undefined}
                backgroundStyle={{
                    backgroundColor: theme.background,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}
                handleComponent={() => (
                    <Animated.View
                        style={[
                            {
                                width: 40,
                                borderRadius: 3,
                                alignSelf: 'center',
                                marginTop: 10,
                            },
                            animatedHandleStyle,
                        ]}
                    />
                )}
                onChange={onChange}
                animationConfigs={animationConfigs}
            >
                <View style={[style,styles.contentContainer]}>{children}</View>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
});

export default CustomBottomSheet;
