import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

const Home = () => {
      
      const snapPoints = useMemo(() => ['50%', '50%', '90%'], []);

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
    backgroundColor: 'grey',
  },
})