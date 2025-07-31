import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomButton from '@/components/common/CustomButton';
import CustomPressable from '@/components/common/CustomPressable';
import ContentContainer from '@/components/content-container/ContentContainer';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { images } from '@/constants/images';
import { countries } from '@/helpers/data';
import { setItem } from '@/lib/storage';
import { useTheme } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const selectLanguage = () => {
  const router = useRouter()
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectCountry, setSelectedCountry] = useState({ highlightedCountry: '', country: '' });

  useEffect(() => {
    setSelectedCountry({ highlightedCountry: 'India', country: 'India' });
    return
  }, [])

  const setOnboarded = async () => {
    // Assuming you have a function to set the onboarding status
    await setItem('hasOnboarded', 'true'); 
    router.push('/auth/login')
  };
  const snapPoints = useMemo(() => ['60%'], []);

  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const onSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const onClickCountry = (country: string) => {
    setSelectedCountry(prev => ({ highlightedCountry: country, country: prev.country }));
  }
  const onConfirmCountry = () => {
    setSelectedCountry(prev => ({ ...prev, country: prev.highlightedCountry }));
    bottomSheetRef.current?.close();
  }

  const getLanguages = (countryName: string) => {
    return countries.find((c) => c.name === countryName)?.availableLanguages || [];
  };


  return (
    <>
    <ContentContainer style={{ padding:16,backgroundColor: theme.background, }}>
      <ThemedView style={styles.busIcon}>
        <MaterialCommunityIcons name="bus-side" size={100} color={theme.text} />
      </ThemedView>

      <ThemedText style={styles.countryText}>
        Country
      </ThemedText>
      <CustomPressable
        onPress={openSheet}
        text={selectCountry.country || 'India'}
        image={images.india}
        icon={<Entypo name="chevron-small-right" size={24} color={theme.text} />}
        />

      <ThemedText style={{ fontWeight: 'bold', fontSize: 24, marginTop: 20, color: theme.text }}>
        Choose your language
      </ThemedText>

      {selectCountry.country !== '' && (
        <FlatList
        data={getLanguages(selectCountry.country)}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <CustomPressable
          onPress={() => onSelectLanguage(item)}
          text={item}
          isActive={selectedLanguage === item}
          icon={
            selectedLanguage === item ? (
              <MaterialIcons name="radio-button-checked" size={24} color={theme.pink} />
            ) : (
              <MaterialIcons name="radio-button-off" size={24} color={theme.text} />
            )
          }
          />
        )}
        />
      )}

        <CustomButton
        onPress={setOnboarded}
        text='Get started'
        />
    </ContentContainer>
    
    <CustomBottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
        <FlatList
          data={countries}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }) => (
            <CustomPressable
              onPress={() => onClickCountry(item.name)}
              text={item.name}
              image={item.image}
              isActive={selectCountry.highlightedCountry === item.name}
              icon={
                selectCountry.highlightedCountry === item.name
                  ? <MaterialIcons name="radio-button-checked" size={24} color={selectCountry.highlightedCountry === item.name ? '#B9375D' : theme.text} />
                  : <MaterialIcons name="radio-button-off" size={24} color={theme.text} />
              }
            />
          )}
          ListFooterComponent={
            <CustomButton
              onPress={onConfirmCountry}
              text='Confirm'
            />
          }
        />
      </CustomBottomSheet>
</>
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
  busIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  countryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
});

export default selectLanguage
