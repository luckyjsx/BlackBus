import CustomPressable from '@/components/common/CustomPressable';
import ContentContainer from '@/components/content-container/ContentContainer';
import { userStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Home = () => {
  const {user, isAuthenticated} = userStore()
  const router = useRouter();

  return (
      <ContentContainer>
        <View style={styles.container}>
        <CustomPressable text='Search' onPress={() => router.push("/(tabs)/home/search")}/>
        <CustomPressable text='register' onPress={() => router.push("/auth/register")}/>
      </View>
      </ContentContainer>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})