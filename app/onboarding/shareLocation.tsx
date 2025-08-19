import CustomButton from '@/components/common/CustomButton'
import ContentContainer from '@/components/content-container/ContentContainer'
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { images } from '@/constants/images'
import { useTheme } from '@/lib/theme'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { BackHandler, StyleSheet, useColorScheme } from 'react-native'
const ShareLocation =  () => {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const onShareLocationClick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status)
  }

   useEffect(() => {
      const onBackPress = () => {
        router.replace('/(tabs)/home');
        return true;
      };
  
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
      return () => subscription.remove();
    }, []);
  
  return (
    <ContentContainer style={{ backgroundColor: theme.background }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ThemedText style={styles.skipText}>Skip</ThemedText>
      <ThemedView style={{ justifyContent:"center",alignItems:'center',gap:10,marginTop:100}}>
        <ThemedText style={styles.heading}>Enhance your travel experience</ThemedText>
        <ThemedText style={styles.description}>blackBus collects and uses location data to find boarding points near you and provide real-time travel updates.</ThemedText>
        <LottieView
        autoPlay
        style={{
          width: 400,
          height: 300,
          // backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={images.shareLocationGif}
        loop
      />
      </ThemedView>
        <CustomButton
          onPress={onShareLocationClick}
          text='Share Location'
        />
    </ContentContainer>
  )
}

export default ShareLocation

const styles = StyleSheet.create({
   skipText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign:"right"
  },
  heading:{
    textAlign:'center',
    fontSize:20,
    fontWeight:"bold"
  },
  description:{
    textAlign:'center',
    fontSize:14,
  },

})