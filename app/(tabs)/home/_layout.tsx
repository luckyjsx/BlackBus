import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack 
     initialRouteName="index"
    >
      <Stack.Screen name="index" options={{headerShown:false,title:"Home"}} />
      <Stack.Screen name="search" options={{headerShown:false,}} />
    </Stack>
  );
}
