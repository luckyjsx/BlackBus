import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomButton from '@/components/common/CustomButton';
import ContentContainer from '@/components/content-container/ContentContainer';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { darkTheme, useTheme } from '@/lib/theme';
import { searchBus } from '@/services/bus';
import { userStore } from '@/store/userStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format, parseISO } from "date-fns";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Home = () => {
  const { user, isAuthenticated } = userStore()
  const router = useRouter();
  const { selectedFromCity: fromParam, selectedToCity: toParam } = useLocalSearchParams<{ selectedFromCity?: string, selectedToCity?: string }>();
  const theme = useTheme();
  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);
  const snapPoints = ['70%'];

  // local state
  const [selectedFromCity, setSelectedFromCity] = useState(fromParam || "");
  const [selectedToCity, setSelectedToCity] = useState(toParam || "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [isSwapped, setIsSwapped] = useState(false); // track toggle
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const onSwapIconPress = () => {
    const targetRotation = isSwapped ? 0 : 180;

    // swap immediately
    if (selectedFromCity && selectedToCity) {
      setSelectedFromCity(selectedToCity);
      setSelectedToCity(selectedFromCity);
    }

    setIsSwapped(!isSwapped);

    // animate
    rotation.value = withTiming(targetRotation, { duration: 400 });
  };



  const parseCity = (city: string) => {
    try {
      return city ? JSON.parse(city).name : "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    let today = new Date();
    let formattedDate = formatDate(today.toISOString());
    setSelectedDate(formattedDate);
  }, [])


const formatDate = (dateString: string) => {
  const date = parseISO(dateString); // parse "2025-07-30"
  return format(date, "EEE d-MMM");  // Mon 1-Sep
};

const onClickToday = () =>{
  let today = new Date();
  let formattedDate = formatDate(today.toISOString());
  setSelectedDate(formattedDate);
}

const onClickTomorrow = () =>{
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let formattedDate = formatDate(tomorrow.toISOString());
  setSelectedDate(formattedDate);
}

const onSearchBusesPress = async () => {
  try {
    // setLoading(true);

    // Example: you already have from, to, and date states
    const result = await searchBus(parseCity(selectedFromCity), parseCity(selectedToCity), selectedDate as string);
    console.log("Search Bus Result:", result.data);

    // if (result.data.length === 0) {
    //   Alert.alert("No Buses Found", "Try another date or city");
    //   return;
    // }

    // ✅ Navigate to bus list screen with result
    router.push({
      pathname: "/home/buslist",
      params: {
        buses: JSON.stringify(result.data), // pass as string, parse on next screen
      },
    });
  } catch (error) {
    console.error("Error searching buses:", error);
    // Alert.alert("Error", "Something went wrong while fetching buses");
  } finally {
    // setLoading(false);
  }
}

  return (
    <>
    <ContentContainer>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.cityContainer}>

          {/* From */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/home/search",
                params: {
                  fromCity: "true",
                  selectedFromCity,
                  selectedToCity,
                },
              })
            }
            style={[styles.cityBox, { borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 5, position: 'relative' }]}
          >
            <MaterialCommunityIcons name="bus" size={24} color={theme.text} />
            <ThemedView>
              <ThemedText style={styles.label}>From</ThemedText>
              {selectedFromCity ? (
                <ThemedText style={styles.cityName}>
                  {parseCity(selectedFromCity)}
                </ThemedText>
              ) : null}
            </ThemedView>

            {/* Swap Icon */}
            <Pressable onPress={onSwapIconPress} style={{ position: 'absolute', top: 38, right: 30 }}>
              <Animated.View style={[animatedStyle,]}>
                <MaterialCommunityIcons
                  onPress={onSwapIconPress}
                  style={{ backgroundColor: theme.pink, borderRadius: 50, padding: 5 }}
                  name="swap-vertical"
                  size={30}
                  color={darkTheme.text}
                />
              </Animated.View>
            </Pressable>
          </Pressable>

          {/* To */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/home/search",
                params: {
                  fromCity: "false",
                  selectedFromCity,
                  selectedToCity,
                },
              })
            }
            style={[styles.cityBox, { borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 5 }]}
          >
            <MaterialCommunityIcons name="bus" size={24} color={theme.text} />
            <ThemedView>
              <ThemedText style={styles.label}>To</ThemedText>
              {selectedToCity ? (
                <ThemedText style={styles.cityName}>
                  {parseCity(selectedToCity)}
                </ThemedText>
              ) : null}
            </ThemedView>
          </Pressable>

          {/* Date */}
          <Pressable
           onPress={() => bottomSheetRef.current?.snapToIndex(0)}
            style={[styles.cityBox,]}
          >
            <MaterialCommunityIcons name="calendar-month-outline" size={24} color={theme.text} />
           <ThemedView style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
             <ThemedView>
              <ThemedText style={styles.label}>Date of Journey</ThemedText>
              <ThemedText style={styles.cityName}>{selectedDate}</ThemedText>
            </ThemedView>


            <ThemedView style={{ flexDirection: 'row', gap:8 }}>
              <Pressable onPress={onClickToday} style={[styles.todayTomorrowPressable,{backgroundColor:theme.pink, }]}>
              <ThemedText style={{ color: darkTheme.text, fontWeight: '600', }}>Today</ThemedText>
            </Pressable>
            <Pressable  onPress={onClickTomorrow} style={[styles.todayTomorrowPressable,{backgroundColor:theme.pink, }]}>
              <ThemedText style={{ color: darkTheme.text, fontWeight: '600' }}>Tomorrow</ThemedText>
            </Pressable>
            </ThemedView>
           </ThemedView>
          </Pressable>

        </ThemedView>

           <CustomButton
                onPress={onSearchBusesPress}
                text="Search buses"
                icon={
                  <Ionicons
                    name="search"
                    size={20}
                    color={darkTheme.text}
                  />
                }
              />
      </ThemedView>
      
    </ContentContainer>
    <CustomBottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
        <ThemedView style={{ padding: 20 }}>
          <ThemedText>Select your journey date</ThemedText>
        </ThemedView>

        <Calendar
          onDayPress={(day) => {
            // Save selected date to state
            // setSelectedDate(day.dateString)
            let formattedDate = formatDate(day.dateString);
            setSelectedDate(day.dateString);
            bottomSheetRef.current?.close(); // close after picking
          }}
          markedDates={{
            // Example: highlight selected date
            ...(selectedDate ? { [selectedDate]: { selected: true, marked: true, selectedColor: theme.pink } } : {}),
          }}
          theme={{
            backgroundColor: theme.background,
            calendarBackground: theme.background,
            textSectionTitleColor: theme.text,
            selectedDayBackgroundColor: theme.pink,
            selectedDayTextColor: theme.background,
            todayTextColor: theme.pink,
            dayTextColor: theme.text,
            arrowColor: theme.pink,
            monthTextColor: theme.text,
            textMonthFontWeight: 'bold',
          }}
        />
      </CustomBottomSheet>
      </>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:16
  },
  cityContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 4,
  },
  cityBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginHorizontal: 5,
    // marginBottom: 5,
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
  },
  todayTomorrowPressable:{
    paddingHorizontal:15, 
    paddingVertical:10, 
    borderRadius:50,
  }
});
