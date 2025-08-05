import CustomButton from '@/components/common/CustomButton'
import ContentContainer from '@/components/content-container/ContentContainer'
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { useTheme } from '@/lib/theme'
import React from 'react'
import { StyleSheet } from 'react-native'

const ShareLocation = () => {
  const theme = useTheme()
  return (
    <ContentContainer style={{ paddingHorizontal: 16, backgroundColor: theme.background }}>
      <ThemedText style={styles.skipText}>Skip</ThemedText>
      <ThemedView style={{ flex:1,justifyContent:"center",gap:10}}>
        <ThemedText style={styles.heading}>Enhance your travel experience</ThemedText>
        <ThemedText style={styles.description}>blackBus collects and uses location data to find boarding points near you and provide real-time travel updates.</ThemedText>
        
        <CustomButton
          onPress={()=>console.log("la")}
          text='Share Location'
        />
      </ThemedView>
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