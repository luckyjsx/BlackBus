import { userStore } from '@/store/userStore';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Home = () => {
  const {user, isAuthenticated} = userStore()

  return (
      <View style={styles.container}>
      </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})