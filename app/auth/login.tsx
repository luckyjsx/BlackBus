import CustomBottomSheet, {
  ReusableBottomSheetRef,
} from "@/components/common/CustomBottomSheet";
import CustomButton from "@/components/common/CustomButton";
import CustomTextInput from "@/components/common/CustomTextInput";
import { useTheme } from "@/lib/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImageBackground, Keyboard, StatusBar, StyleSheet } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(16),
});
zodResolver;

const bouncySpring = {
  damping: 14,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};

const Login = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<ReusableBottomSheetRef>(null);
  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const snapPoints = useMemo(() => ["40%", "100%"], []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: {}) => {
    console.log(data);
  };

  useFocusEffect(
    useCallback(() => {
      const openTimeout = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(1);
        const closeTimeout = setTimeout(() => {
          bottomSheetRef.current?.snapToIndex(0);
        }, 1200);
        return () => clearTimeout(closeTimeout);
      }, 100);
      return () => clearTimeout(openTimeout);
    }, [])
  );

  const onFocusInput = () => bottomSheetRef.current?.expand();
  return (
    <>
      <StatusBar barStyle={'dark-content'}/>
      <ImageBackground
        source={{
          uri: "https://thumbs.dreamstime.com/z/indian-family-india-cartoon-indian-family-ethnic-india-wearing-traditional-hindu-clothes-taj-mahal-buildings-vector-155819081.jpg",
        }}
        resizeMode="cover"
        style={styles.imageBackground}
      ></ImageBackground>
    {/* <ContentContainer style={{ flex: 1, backgroundColor: theme.background }}>
    </ContentContainer> */}
      <CustomBottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        hideSheet={false}
        index={0}
        outsidePresBehaviour={"none"}
        animationConfigs={bouncySpring}
        onChange={(index: number) => {
          if (index === 0) Keyboard.dismiss(); // collapse = hide keyboard
        }}
        showBackDrop={false}
      >
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
      </CustomBottomSheet>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    width: 800,
    height: 600,
    // justifyContent: "flex-end", // or 'center' depending on layout
  },
});
