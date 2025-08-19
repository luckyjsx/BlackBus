
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
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