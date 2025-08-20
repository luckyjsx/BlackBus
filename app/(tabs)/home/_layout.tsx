import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack 
     initialRouteName="index"
     screenOptions={{
      animation:"slide_from_right"
     }}
    >
      <Stack.Screen name="index" options={{headerShown:false,title:"Home"}} />
      <Stack.Screen name="search" options={{headerShown:false,animation:"slide_from_right"}} />
    </Stack>
  );
}
