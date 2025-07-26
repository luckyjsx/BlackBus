import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomPressable from '@/components/common/CustomPressable';
import ContentContainer from '@/components/content-container/ContentContainer';
import { setItem } from '@/lib/storage';
import { LightTheme } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <MaterialCommunityIcons name="bus-side" size={100} color="black" />
        {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Black Bus
        </Text> */}
      </View>

      <View >
        <Text>
          Country
        </Text>
        <CustomPressable
          onPress={openSheet}
          text="India"
          image={require('@/assets/images/flags/india.png')}
          textStyle={styles.text}
          icon={<Entypo name="chevron-small-right" size={24} color="black" />}
        />
      </View>

      <CustomBottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
        <Text style={{ fontSize: 18 }}>Hello from Bottom Sheet</Text>
        <Button title="Close" onPress={closeSheet} />
      </CustomBottomSheet>

      <TouchableOpacity onPress={setOnboarded}>
        <Text>Welcome to the Onboarding Screen 1</Text>
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
   icon:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:LightTheme.background
  },
  text:{
    fontSize: 18,
    color: LightTheme.text,
  },
  countryPressable: {
    backgroundColor: LightTheme.background,
  }
});

export default selectLanguage
