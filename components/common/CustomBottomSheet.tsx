// components/ReusableBottomSheet.tsx
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
        backgroundColor: 'white',
    },
});

export default CustomBottomSheet;
