import BusCard from '@/components/bus/BusCard';
import ContentContainer from '@/components/content-container/ContentContainer';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const BusList = () => {
    const { buses} = useLocalSearchParams<{ buses?: string}>();
    console.log("laxman..",buses)
  return (
    <ContentContainer>
      <BusCard/>
    </ContentContainer>
  )
}

export default BusList

const styles = StyleSheet.create({})