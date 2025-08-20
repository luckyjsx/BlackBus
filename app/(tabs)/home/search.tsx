import CustomTextInput from '@/components/common/CustomTextInput'
import ContentContainer from '@/components/content-container/ContentContainer'
import { ThemedText } from '@/components/themed/ThemedText'
import { useDebounce } from '@/hooks/useDebounce'
import { useTheme } from '@/lib/theme'
import { City, searchCities } from '@/services/cities'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { FlatList, Pressable } from 'react-native-gesture-handler'


const Search = () => {
  const {control, watch} = useForm()
  const searchValue = watch('search', '');
  const debouncedSearchValue = useDebounce(searchValue,500);
  const [cities, setCities] = useState<City[]>([]);
  const theme = useTheme();
  const router = useRouter();

  const perfromSearch = useCallback(async (searchTerm: string) => {
    if(searchTerm.trim()){
      console.log("Searching for:", searchTerm);
      try {
      const results = await searchCities(searchTerm);
      setCities(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      // setLoading(false);
    }
    }
  },[])

  useEffect(()=>{
    perfromSearch(debouncedSearchValue);
  },[debouncedSearchValue, perfromSearch])

  return (
    <ContentContainer>
      <Controller
        control={control}
        name='search'
        defaultValue=''
        render={({field:{onChange,onBlur,value}})=>(
          <CustomTextInput
            placeholder='Search...'
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            bordered
            showLeftIcon
          />
        )}

      />
      <FlatList
        data={cities}
        keyExtractor={(city) => city._id}
        renderItem={({item, index}) =>(
          <Link href={"/(tabs)/home"} asChild>
            <Pressable onPress={() => router.replace("/(tabs)/home")} style={[styles.cityContainer,{borderColor:theme.lightSilver}, index === cities.length-1 && {borderBottomWidth:0}]} key={item._id}>
            <ThemedText >{item.name}</ThemedText>
          </Pressable>
          </Link>
        )}
      />
    </ContentContainer>
  )
}

export default Search

const styles = StyleSheet.create({
cityContainer:{
  padding: 10,
  borderBottomWidth: 1,
}
})