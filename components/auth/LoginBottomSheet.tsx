// components/auth/LoginBottomSheet.tsx
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { z } from 'zod';

// Components
import CustomBottomSheet, { ReusableBottomSheetRef } from '@/components/common/CustomBottomSheet';
import CustomButton from '@/components/common/CustomButton';
import CustomTextInput from '@/components/common/CustomTextInput';
import Separator from '@/components/common/Seprator';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';

// Theme
import { darkTheme, useTheme } from '@/lib/theme';

// Login schema
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

// Animation configs
const bouncySpring = {
  damping: 13,
  mass: 0.9,
  stiffness: 250,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};

const SPRING_CONFIG = {
  damping: 14,
  stiffness: 400,
  mass: 0.9,
};

const TIMING_CONFIG = {
  duration: 250,
};

// Ref interface for external control
export interface LoginBottomSheetRef {
  snapToIndex: (index: number) => void;
  expand: () => void;
  close: () => void;
  getCurrentIndex: () => number;
  getFormData: () => LoginFormData | null;
  resetForm: () => void;
}

// Props interface to get currentIndex
export interface LoginBottomSheetProps {
  onIndexChange?: (index: number) => void;
}

const LoginBottomSheet = forwardRef<LoginBottomSheetRef, LoginBottomSheetProps>(({ 
  onIndexChange 
}, ref) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fixed snap points and configuration
  const snapPoints = ["50%", "100%"];
  const initialIndex = 0;
  const showBackDrop = false;
  const outsidePresBehaviour = "none";

  // Animation values for X button
  const xButtonOpacity = useSharedValue(0);
  const xButtonScale = useSharedValue(0.8);
  const xButtonRotate = useSharedValue(-45);

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    },
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
    getCurrentIndex: () => currentIndex,
    getFormData: () => {
      try {
        const values = getValues();
        loginSchema.parse(values);
        return values;
      } catch {
        return null;
      }
    },
    resetForm: () => {
      reset();
    },
  }));

  // Form submission handler - all logic contained here
  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      console.log("Login attempt with:", data);
      
      
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }, [reset]);

  // Google sign-in handler - all logic contained here
  const handleGoogleSignIn = useCallback(async () => {
    try {
      console.log("Google sign-in initiated");
      
    } catch (error) {
      console.error("Google sign-in error:", error);
      Alert.alert("Error", "Google sign-in failed. Please try again.");
    }
  }, [reset]);

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

  // Handle input focus
  const onFocusInput = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // Improved animation handling
  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) Keyboard.dismiss();
    setCurrentIndex(index);

    // Notify parent component about index change
    onIndexChange?.(index);

    if (index === 1) {
      xButtonOpacity.value = withTiming(1, TIMING_CONFIG);
      xButtonScale.value = withSpring(1, SPRING_CONFIG);
      xButtonRotate.value = withSpring(0, SPRING_CONFIG);
    } else {
      xButtonOpacity.value = withTiming(0, TIMING_CONFIG);
      xButtonScale.value = withSpring(0.8, SPRING_CONFIG);
      xButtonRotate.value = withSpring(-45, SPRING_CONFIG);
    }
  }, [xButtonOpacity, xButtonScale, xButtonRotate, onIndexChange]);

  return (
    <CustomBottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      hideSheet={false}
      index={initialIndex}
      outsidePresBehaviour={outsidePresBehaviour}
      animationConfigs={bouncySpring}
      onChange={handleSheetChange}
      hideIndicator={currentIndex === 1}
      showBackDrop={showBackDrop}
      style={{flex:1}}
    >
      {/* Container with relative positioning for X button */}
      <ThemedView style={styles.contentContainer}>
        {/* Absolutely positioned X Button - doesn't affect layout */}
        <Animated.View
          style={[styles.xButtonContainer, animatedXStyle]}
          pointerEvents={currentIndex === 1 ? "box-none" : "none"}
        >
          <TouchableOpacity
            onPress={handleCloseBottomSheet}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={30} color={theme.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Form content */}
        <ThemedView style={{ flex: 1, justifyContent: "space-between" }}>
          <ThemedView style={styles.formContent}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Email"
                  bordered
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your Email"
                  errorMsg={errors.email?.message}
                  onPress={onFocusInput}
                  labelStyle={{ marginTop: 20 }}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Password"
                  bordered
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your Password"  
                  errorMsg={errors.password?.message}
                  secureTextEntry
                  onPress={onFocusInput}
                />
              )}
            />

            <CustomButton text="Login" onPress={handleSubmit(onSubmit)} />
            <Separator />
            <CustomButton
              onPress={handleGoogleSignIn}
              text="Sign in with Google"
              icon={
                <Ionicons
                  name="logo-google"
                  size={20}
                  color={darkTheme.text}
                />
              }
            />
          </ThemedView>

          <ThemedView>
            <Link
              href="/auth/register"
              style={[styles.dontHaveAccountText, { color: theme.link }]}
            >
              Don't Have an account? Create one
            </Link>

            <ThemedView
              style={[
                styles.termsConditionContainer,
                { borderTopColor: theme.lightSilver },
              ]}
            >
              <ThemedText
                style={[styles.byLoggingText, { color: theme.text }]}
              >
                By 'logging in' I agree to the
              </ThemedText>
              <ThemedView style={styles.termsConditionText}>
                <TouchableOpacity onPress={() => handleTermsPress("terms")}>
                  <ThemedText style={[styles.linkText, { color: theme.link }]}>
                    Terms & Conditions
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTermsPress("privacy")}>
                  <ThemedText style={[styles.linkText, { color: theme.link }]}>
                    Privacy Policy
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </CustomBottomSheet>
  );
});

// Simulate API calls - Replace these with your actual API implementations




// Handle terms and privacy policy press
const handleTermsPress = (type: "terms" | "privacy") => {
  const message = type === "terms" 
    ? "Terms & Conditions will be displayed here." 
    : "Privacy Policy will be displayed here.";
    
  Alert.alert(
    type === "terms" ? "Terms & Conditions" : "Privacy Policy",
    message,
    [{ text: "OK" }]
  );
};

LoginBottomSheet.displayName = 'LoginBottomSheet';

export default LoginBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    position: "relative",
    flex: 1,
  },
  xButtonContainer: {
    position: "absolute",
    top: 5,
    right: 0,
    zIndex: 1000,
  },
  formContent: {
    paddingTop: 10,
  },
  dontHaveAccountText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  termsConditionContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
  },
  byLoggingText: {
    textAlign: "center",
    paddingTop: 4,
  },
  termsConditionText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
