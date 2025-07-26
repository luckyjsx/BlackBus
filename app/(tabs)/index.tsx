import BottomSheet from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
      
      const snapPoints = useMemo(() => ['50%', '50%', '90%'], []);

  return (
      <View style={styles.container}>
        <BottomSheet enableDynamicSizing={false} snapPoints={snapPoints}>
          <Text style={{ fontSize: 18 }}>Hello from Bottom Sheet!</Text>
        </BottomSheet>
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