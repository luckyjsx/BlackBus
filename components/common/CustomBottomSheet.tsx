// components/ReusableBottomSheet.tsx
import { useTheme } from '@/lib/theme';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetProps } from '@gorhom/bottom-sheet';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { ReactNode, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export interface ReusableBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
    hideSheet?:boolean,
    index?:number,
    outsidePresBehaviour?: BackdropPressBehavior
    onChange?: (index: number) => void;
    animationConfigs?: BottomSheetProps['animationConfigs'];
    showBackDrop?:boolean
}

export interface ReusableBottomSheetRef {
    expand: () => void;
    close: () => void;
    snapToIndex: (index: number) => void;
}

const CustomBottomSheet = forwardRef<ReusableBottomSheetRef, ReusableBottomSheetProps>(
    ({
        children,
        snapPoints = ['50%'],
        hideSheet = true,
        index = -1,
        outsidePresBehaviour,
        onChange,
        animationConfigs,
        showBackDrop=true
    }, ref) => {
        const theme = useTheme();
        const sheetRef = useRef<BottomSheet>(null);


        // Backdrop customization
        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={outsidePresBehaviour}/>
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
            snapToIndex: (index: number) => {
                sheetRef.current?.snapToIndex(index); // ✅ Expose this method
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
                backgroundStyle={{ backgroundColor: theme.background, borderTopLeftRadius:0, borderTopRightRadius:0 }}
                handleIndicatorStyle={{ backgroundColor: theme.pink }}
                onChange={onChange}
                animationConfigs={animationConfigs} 
                // style={{borderTopColor: theme.text, borderTopWidth: 1, borderRadius: 16}}
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
