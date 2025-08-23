
import { useTheme } from '@/lib/theme';
import { Tabs, useSegments } from 'expo-router';
import React from 'react';

const TabLayout = () => {
  const segments = useSegments() as string[];
  const theme = useTheme();
  const currentPage = segments[segments.length - 1];
  const pagesToHideTabBar = ['search', 'buslist', 'profile-edit'];
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: theme.text,
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
            display: pagesToHideTabBar.includes(currentPage) ? 'none' : 'flex',
            },
        }}
        initialRouteName='home'
    >
      <Tabs.Screen name='home' options={{headerShown:false,title:"Home",}}/>
      <Tabs.Screen name='bookings' options={{headerShown:false,title:"Bookings"}}/>
      <Tabs.Screen name='help' options={{headerShown:false,title:"Help"}}/>
      <Tabs.Screen name='myAccount' options={{title:"User"}}/>
    </Tabs>
  )
}

export default TabLayout