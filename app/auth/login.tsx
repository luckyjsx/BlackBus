import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Components
import LoginBottomSheet, { LoginBottomSheetRef } from "@/components/auth/LoginBottomSheet";
import { ThemedView } from "@/components/themed/ThemedView";

// Theme
import { darkTheme } from "@/lib/theme";

// Get screen dimensions
const { width: screenWidth } = Dimensions.get("window");

// Animation configs
const PAGINATION_TIMING_CONFIG = {
  duration: 300,
};

const Login = () => {
  const colorScheme = useColorScheme();
  const loginBottomSheetRef = useRef<LoginBottomSheetRef>(null);
  
  // This is the currentIndex for the bottom sheet (needed for StatusBar styling)
  const [currentBottomSheetIndex, setCurrentBottomSheetIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation values for pagination
  const paginationAnimation = useSharedValue(0);

  const imagesUrl = [
    "https://thumbs.dreamstime.com/z/indian-family-india-cartoon-indian-family-ethnic-india-wearing-traditional-hindu-clothes-taj-mahal-buildings-vector-155819081.jpg",
    "https://www.shutterstock.com/image-vector/asian-family-airport-flat-color-260nw-1361236670.jpg",
    "https://www.shutterstock.com/image-vector/family-trip-concept-illustration-symbols-260nw-2549582935.jpg",
  ];

  // Update pagination animation
  useEffect(() => {
    paginationAnimation.value = withTiming(
      currentImageIndex,
      PAGINATION_TIMING_CONFIG
    );
  }, [currentImageIndex]);

  // Handle bottom sheet index change
  const handleBottomSheetIndexChange = (index: number) => {
    setCurrentBottomSheetIndex(index);
  };

  // Pagination dot component
  const AnimatedPaginationDot = ({ index }: { index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const currentActiveIndex = paginationAnimation.value;
      const totalImages = imagesUrl.length;

      if (Math.round(currentActiveIndex) === index) {
        const width = interpolate(
          paginationAnimation.value,
          [index - 0.5, index, index + 0.5],
          [10, 35, 10],
          "clamp"
        );
        const height = interpolate(
          paginationAnimation.value,
          [index - 0.5, index, index + 0.5],
          [10, 18, 10],
          "clamp"
        );
        const borderRadius = interpolate(
          paginationAnimation.value,
          [index - 0.5, index, index + 0.5],
          [5, 16, 5],
          "clamp"
        );

        const backgroundColor = interpolateColor(
          paginationAnimation.value,
          [index - 0.5, index, index + 0.5],
          [
            "rgba(128, 128, 128, 0.6)",
            darkTheme.pink,
            "rgba(128, 128, 128, 0.6)",
          ]
        );

        return {
          width,
          height,
          borderRadius,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        };
      } else {
        const activeIndex = Math.round(currentActiveIndex);
        let size = 8;

        if (activeIndex === 0) {
          if (index === 1) size = 9;
          else if (index === 2) size = 7;
        } else if (activeIndex === totalImages - 1) {
          if (index === totalImages - 2) size = 9;
          else size = 7;
        } else {
          if (Math.abs(index - activeIndex) === 1) size = 7;
          else size = 8;
        }

        return {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "rgba(128, 128, 128, 0.6)",
          justifyContent: "center",
          alignItems: "center",
        };
      }
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
      const textOpacity = interpolate(
        paginationAnimation.value,
        [index - 0.3, index, index + 0.3],
        [0, 1, 0],
        "clamp"
      );

      const textScale = interpolate(
        paginationAnimation.value,
        [index - 0.2, index, index + 0.2],
        [0.8, 1, 0.8],
        "clamp"
      );

      return {
        opacity: textOpacity,
        transform: [{ scale: textScale }],
      };
    });

    return (
      <Animated.View style={animatedStyle}>
        <Animated.Text style={[styles.activePaginationText, textAnimatedStyle]}>
          {index + 1}/{imagesUrl.length}
        </Animated.Text>
      </Animated.View>
    );
  };

  return (
    <>
      <StatusBar
        style={
          colorScheme === "dark"
            ? currentBottomSheetIndex === 0
              ? "dark"
              : "light"
            : "dark"
        }
      />

      {/* Background Image Carousel */}
      <FlatList
        data={imagesUrl}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        style={styles.backgroundCarousel}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          setCurrentImageIndex(index);
        }}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item }}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <ThemedView style={styles.headerContainer}>
              <ThemedView style={styles.paginationContainer}>
                {imagesUrl.map((_, dotIndex) => (
                  <AnimatedPaginationDot key={dotIndex} index={dotIndex} />
                ))}
              </ThemedView>

              <Link href="/onboarding/shareLocation" style={styles.skipText}>
                Skip
              </Link>
            </ThemedView>
          </ImageBackground>
        )}
      />

      {/* Self-contained Login Bottom Sheet with index change handler */}
      <LoginBottomSheet 
        ref={loginBottomSheetRef} 
        onIndexChange={handleBottomSheetIndexChange}
      />
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundCarousel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageBackground: {
    width: screenWidth,
    height: 600,
  },
  headerContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "transparent",
  },
  activePaginationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  skipText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
