// screens/Login.tsx
import CustomBottomSheet, {
  ReusableBottomSheetRef,
} from "@/components/common/CustomBottomSheet";
import CustomButton from "@/components/common/CustomButton";
import CustomTextInput from "@/components/common/CustomTextInput";
import Separator from "@/components/common/Seprator";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { darkTheme, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { z } from "zod";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Fixed schema with proper required validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(16, { message: "Password must be no more than 16 characters long" }),
});

// Define the form data type
type LoginFormData = z.infer<typeof loginSchema>;

const bouncySpring = {
  damping: 13,
  mass: 0.9,
  stiffness: 250,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};

// Smooth animation configs
const SPRING_CONFIG = {
  damping: 14,
  stiffness: 400,
  mass: 0.9,
};

const TIMING_CONFIG = {
  duration: 250,
};

const Login = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();
  

  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const hasAutoFlowRun = useRef(false);

  // Animation values for X button
  const xButtonOpacity = useSharedValue(0);
  const xButtonScale = useSharedValue(0.8);
  const xButtonRotate = useSharedValue(-45);

  const imagesUrl = [
    "https://thumbs.dreamstime.com/z/indian-family-india-cartoon-indian-family-ethnic-india-wearing-traditional-hindu-clothes-taj-mahal-buildings-vector-155819081.jpg",
    "https://www.shutterstock.com/image-vector/asian-family-airport-flat-color-260nw-1361236670.jpg",
    "https://www.shutterstock.com/image-vector/family-trip-concept-illustration-symbols-260nw-2549582935.jpg"
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // Updated onSubmit with proper typing
  const onSubmit = (data: LoginFormData) => {
    console.log("Form is valid, submitted data:", data);
    // Your login logic here
  };

  // Smooth X button animation style
  const animatedXStyle = useAnimatedStyle(() => {
    return {
      opacity: xButtonOpacity.value,
      transform: [
        { scale: xButtonScale.value },
        { rotate: `${xButtonRotate.value}deg` },
      ],
    };
  });

  // Handle X button press
  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const onFocusInput = () => {
    bottomSheetRef.current?.expand();
  };

  // Improved animation handling
  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) Keyboard.dismiss();
    setCurrentIndex(index);

    if (index === 1) {
      // Show X button with smooth spring animation
      xButtonOpacity.value = withTiming(1, TIMING_CONFIG);
      xButtonScale.value = withSpring(1, SPRING_CONFIG);
      xButtonRotate.value = withSpring(0, SPRING_CONFIG);
    } else {
      // Hide X button with smooth animation
      xButtonOpacity.value = withTiming(0, TIMING_CONFIG);
      xButtonScale.value = withSpring(0.8, SPRING_CONFIG);
      xButtonRotate.value = withSpring(-45, SPRING_CONFIG);
    }
  }, [xButtonOpacity, xButtonScale, xButtonRotate]);

  return (
    <>
      <StatusBar
        barStyle={
          colorScheme === "dark"
            ? currentIndex === 0
              ? "dark-content"
              : "light-content"
            : "dark-content"
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
        renderItem={({ item, index }) => (
          <ImageBackground
            source={{ uri: item }}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <ThemedText style={styles.indexText}>
              {index + 1}/{imagesUrl.length}
            </ThemedText>
          </ImageBackground>
        )}
      />


      {/* Bottom Sheet overlays the background */}
      <CustomBottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        hideSheet={false}
        index={0}
        outsidePresBehaviour={"none"}
        animationConfigs={bouncySpring}
        onChange={handleSheetChange}
        hideIndicator={currentIndex === 1}
        showBackDrop={false}
      >
        {/* Container with relative positioning for X button */}
        <ThemedView style={styles.contentContainer}>
          {/* Absolutely positioned X Button - doesn't affect layout */}
          <Animated.View
            style={[styles.xButtonContainer, animatedXStyle]}
            pointerEvents={currentIndex === 1 ? 'box-none' : 'none'}
          >
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={30}
                color={theme.text}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Form content */}
          <ThemedView style={styles.formContent}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label={"Email"}
                  bordered
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your Email"
                  errorMsg={errors.email?.message}
                  onFocus={onFocusInput}
                  labelStyle={{ marginTop: 20 }}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label={"Password"}
                  bordered
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your Password"
                  errorMsg={errors.password?.message}
                  secureTextEntry
                  onFocus={onFocusInput}
                />
              )}
            />

            <CustomButton text="Login" onPress={handleSubmit(onSubmit)} />

            <Separator />

            <CustomButton
              onPress={() => console.log("hello")}
              text="Sign in with Google"
              icon={<Ionicons name="logo-google" size={20} color={darkTheme.text} />}
            />
          </ThemedView>
        </ThemedView>
      </CustomBottomSheet>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundCarousel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageBackground: {
    width: screenWidth,
    height: screenHeight,
  },
  indexText: {
    position: 'absolute',
    top: 50, // Adjust for status bar height
    left: 20,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: darkTheme.pink, // Semi-transparent dark background
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20, // More rounded like in the image
    textAlign: 'center',
    minWidth: 40,
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    flex: 1,
  },
  xButtonContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 1000,
  },
  xButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  formContent: {
    paddingTop: 10,
  },
});
