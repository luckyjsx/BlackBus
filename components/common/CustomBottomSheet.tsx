// components/ReusableBottomSheet.tsx
import { useTheme } from '@/lib/theme';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, { ReactNode, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export interface ReusableBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
}

export interface ReusableBottomSheetRef {
    expand: () => void;
    close: () => void;
}

const CustomBottomSheet = forwardRef<ReusableBottomSheetRef, ReusableBottomSheetProps>(
    ({ children, snapPoints = ['50%'] }, ref) => {
        const theme = useTheme();
        const sheetRef = useRef<BottomSheet>(null);


        // Backdrop customization
        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
            ),
            []
        );

        useImperativeHandle(ref, () => ({
            expand: () => {
                console.log('Expand called');
                sheetRef.current?.expand();
            },
            close: () => {
                console.log('Close called');
                sheetRef.current?.close();
            },
        }));


        return (
            <BottomSheet
                enableDynamicSizing={false}
                ref={sheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: theme.background }}
                handleIndicatorStyle={{ backgroundColor: '#B9375D' }}
                style={{borderTopColor: theme.text, borderTopWidth: 1, borderRadius: 16}}
            >
                <View style={styles.contentContainer}>{children}</View>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1,
        padding: 16,
    },
});

export default CustomBottomSheet;
