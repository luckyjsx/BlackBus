import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomButton from '@/components/common/CustomButton';
import CustomPressable from '@/components/common/CustomPressable';
import ContentContainer from '@/components/content-container/ContentContainer';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { setItem } from '@/lib/storage';
import { useTheme } from '@/lib/theme';
import { Country, getCountries } from '@/services/country';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const SelectLanguage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [countrySelection, setCountrySelection] = useState<{
    highlightedCountry: string;
    country: string;
  }>({ highlightedCountry: '', country: '' });

  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCountries(true);
        const list = await getCountries();
        setCountriesData(list);
        if (list.length > 0) {
          const first = list[0].name;
          setCountrySelection({ highlightedCountry: first, country: first });
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load countries.');
      } finally {
        setLoadingCountries(false);
      }
    };
    load();
  }, []);

  const setOnboarded = async () => {
    if (!countrySelection.country) {
      Alert.alert('Please select a country');
      return;
    }
    if (!selectedLanguage) {
      Alert.alert('Please choose a language');
      return;
    }
    await setItem('hasOnboarded', 'true');
    router.replace('/auth/login');
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
    setCountrySelection(prev => ({ ...prev, highlightedCountry: country }));
  };

  const onConfirmCountry = () => {
    setCountrySelection(prev => ({
      highlightedCountry: prev.highlightedCountry,
      country: prev.highlightedCountry,
    }));
    setSelectedLanguage('');
    bottomSheetRef.current?.close();
  };

  const currentCountry = countriesData.find(c => c.name === countrySelection.country);
  const languageOptions = currentCountry?.availableLanguages || [];

  return (
    <>
    <ContentContainer style={{ backgroundColor: theme.background, }}>
      <ThemedView style={styles.busIcon}>
        <MaterialCommunityIcons name="bus-side" size={100} color={theme.text} />
      </ThemedView>

        <ThemedText style={styles.countryText}>Country</ThemedText>
        {loadingCountries ? (
          <ActivityIndicator />
        ) : error ? (
          <ThemedText style={{ color: 'red' }}>{error}</ThemedText>
        ) : (
          <CustomPressable
            onPress={openSheet}
            text={countrySelection.country || 'Select country'}
            image={currentCountry ? { uri: currentCountry.image } : undefined}
            icon={<Entypo name="chevron-small-right" size={24} color={theme.text} />}
          />
        )}

        <ThemedText
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginTop: 20,
            color: theme.text,
          }}
        >
          Choose your language
        </ThemedText>

        {countrySelection.country !== '' && (
          <FlatList
            data={languageOptions}
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
            ListEmptyComponent={
              <ThemedText style={{ marginTop: 8, color: theme.text }}>
                No languages available for this country.
              </ThemedText>
            }
          />
        )}

       <CustomButton
          onPress={setOnboarded}
          text='Get started'
          style={{marginBottom:20}}
        />
      </ContentContainer>

      <CustomBottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
        <FlatList
          data={countriesData}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <CustomPressable
              onPress={() => onClickCountry(item.name)}
              text={item.name}
              image={{uri:item.image}}
              isActive={countrySelection.highlightedCountry === item.name}
              icon={
                countrySelection.highlightedCountry === item.name ? (
                  <MaterialIcons
                    name="radio-button-checked"
                    size={24}
                    color={countrySelection.highlightedCountry === item.name ? '#B9375D' : theme.text}
                  />
                ) : (
                  <MaterialIcons name="radio-button-off" size={24} color={theme.text} />
                )
              }
            />
          )}
          ListFooterComponent={
             <CustomButton
              onPress={onConfirmCountry}
              text='Confirm'
              style={{marginVertical:20}}
            />
          }
        />
      </CustomBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  busIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SelectLanguage;
