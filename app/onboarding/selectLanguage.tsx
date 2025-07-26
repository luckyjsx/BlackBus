import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomPressable from '@/components/common/CustomPressable';
import ContentContainer from '@/components/content-container/ContentContainer';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { setItem } from '@/lib/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useRef } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

const selectLanguage = () => {
  const setOnboarded = async () => {
    // Assuming you have a function to set the onboarding status
    await setItem('hasOnboarded', 'true');
    // Navigate to the next screen or main app
  };
  const snapPoints = useMemo(() => ['60%'], []);

  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };
  return (
    <ContentContainer style={{ borderWidth: 1, borderColor: 'red' }}>
      <ThemedView style={{ justifyContent: 'center', alignItems: 'center', }}>
        <MaterialCommunityIcons name="bus-side" size={100} color="black" />
        {/* <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>
          Black Bus
        </ThemedText> */}
      </ThemedView>

      <ThemedView >
        <ThemedText>
          Country
        </ThemedText>
        <CustomPressable
          onPress={openSheet}
          text="India"
          image={require('@/assets/images/flags/india.png')}
        />
      </ThemedView>

      <CustomBottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
        <ThemedText style={{ fontSize: 18 }}>Hello from Bottom Sheet</ThemedText>
        <Button title="Close" onPress={closeSheet} />
      </CustomBottomSheet>

      <TouchableOpacity onPress={setOnboarded}>
        <ThemedText>Welcome to the Onboarding Screen 1</ThemedText>
      </TouchableOpacity>
    </ContentContainer>
  )
}

//create stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default selectLanguage
