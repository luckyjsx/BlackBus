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
import { loginUser } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { z } from "zod";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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

// Non-bouncy pagination animation config
const PAGINATION_TIMING_CONFIG = {
  duration: 300,
};

const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const colorScheme = useColorScheme();

  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const hasAutoFlowRun = useRef(false);

  // Animation values for X button
  const xButtonOpacity = useSharedValue(0);
  const xButtonScale = useSharedValue(0.8);
  const xButtonRotate = useSharedValue(-45);

  // Animation values for pagination - using withTiming for smooth animation
  const paginationAnimation = useSharedValue(0);

  const imagesUrl = [
    "https://thumbs.dreamstime.com/z/indian-family-india-cartoon-indian-family-ethnic-india-wearing-traditional-hindu-clothes-taj-mahal-buildings-vector-155819081.jpg",
    "https://www.shutterstock.com/image-vector/asian-family-airport-flat-color-260nw-1361236670.jpg",
    "https://www.shutterstock.com/image-vector/family-trip-concept-illustration-symbols-260nw-2549582935.jpg",
  ];

  // Update pagination animation when currentImageIndex changes (smooth, non-bouncy)
  useEffect(() => {
    paginationAnimation.value = withTiming(
      currentImageIndex,
      PAGINATION_TIMING_CONFIG
    );
  }, [currentImageIndex]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Updated onSubmit with proper typing
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      if(response.success) {
        Alert.alert("Login Successful", response.message);
        console.log("JWT Token:", response.token);
        console.log("User:", response.user);
        router.replace("/")
      } else {
        Alert.alert("Login Failed", response.message);
      }
    } catch(error){
      console.error("Login error:", error);
      Alert.alert("Error","Invalid credentials or network error.")
    }
    console.log("Form is valid, submitted data:", data);
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

  // Handle skip button press
  const handleSkip = () => {
    console.log("Skip pressed");
  };

  // Improved animation handling
  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === 0) Keyboard.dismiss();
      setCurrentIndex(index);

      if (index === 1) {
        xButtonOpacity.value = withTiming(1, TIMING_CONFIG);
        xButtonScale.value = withSpring(1, SPRING_CONFIG);
        xButtonRotate.value = withSpring(0, SPRING_CONFIG);
      } else {
        xButtonOpacity.value = withTiming(0, TIMING_CONFIG);
        xButtonScale.value = withSpring(0.8, SPRING_CONFIG);
        xButtonRotate.value = withSpring(-45, SPRING_CONFIG);
      }
    },
    [xButtonOpacity, xButtonScale, xButtonRotate]
  );

  const AnimatedPaginationDot = ({ index }: { index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const currentActiveIndex = paginationAnimation.value;
      const totalImages = imagesUrl.length;

      if (Math.round(currentActiveIndex) === index) {
        // Active index - becomes pill with pink background
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
          ] // Grey to pink to grey
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
        // Inactive dots with dynamic sizing and grey color
        const activeIndex = Math.round(currentActiveIndex);
        const distance = Math.abs(index - activeIndex);

        let size = 8; // base size

        // Dynamic sizing based on active index position
        if (activeIndex === 0) {
          // First index active: second dot bigger, third dot smaller
          if (index === 1) size = 9;
          else if (index === 2) size = 7;
        } else if (activeIndex === totalImages - 1) {
          // Last index active: previous dot bigger, others smaller
          if (index === totalImages - 2) size = 9;
          else size = 7;
        } else {
          // Middle index active: adjacent dots same size
          if (distance === 1) size = 7;
          else size = 8;
        }

        return {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "rgba(128, 128, 128, 0.6)", // Grey color for inactive dots
          justifyContent: "center",
          alignItems: "center",
        };
      }
    });

    // Smooth, non-bouncy text animation
    const textAnimatedStyle = useAnimatedStyle(() => {
      const textOpacity = interpolate(
        paginationAnimation.value,
        [index - 0.3, index, index + 0.3],
        [0, 1, 0],
        "clamp"
      );

      // Smoother text scaling without bounce
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
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          setCurrentImageIndex(index);
        }}
        renderItem={({ item, index }) => (
          <ImageBackground
            source={{ uri: item }}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <ThemedView style={styles.headerContainer}>
              {/* Left side - Animated Pagination indicator */}
              <ThemedView style={styles.paginationContainer}>
                {imagesUrl.map((_, dotIndex) => (
                  <AnimatedPaginationDot key={dotIndex} index={dotIndex} />
                ))}
              </ThemedView>

              {/* Right side - Skip button */}
              {/* <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              </TouchableOpacity> */}
                <Link href={"/onboarding/shareLocation"} style={styles.skipText}>Skip</Link>
            </ThemedView>
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
                href={"/auth/register"}
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
                  <ThemedText style={[styles.linkText, { color: theme.link }]}>
                    Terms & Conditions
                  </ThemedText>
                  <ThemedText style={[styles.linkText, { color: theme.link }]}>
                    Privacy Policy
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </CustomBottomSheet>
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
  skipButton: {
    padding: 8,
    backgroundColor: "transparent",
  },
  skipText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
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
