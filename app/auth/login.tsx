// screens/Login.tsx
import CustomBottomSheet, {
  ReusableBottomSheetRef,
} from "@/components/common/CustomBottomSheet";
import CustomButton from "@/components/common/CustomButton";
import CustomTextInput from "@/components/common/CustomTextInput";
import Separator from "@/components/common/Seprator";
import { darkTheme, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  useColorScheme
} from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(16),
});

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();  

  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const hasAutoFlowRun = useRef(false);
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
      if (hasAutoFlowRun.current) {
        return;
      }
      hasAutoFlowRun.current = true;

      // const openTimeout = setTimeout(() => {
      //   bottomSheetRef.current?.snapToIndex(1);
      // }, 100);

      // const closeTimeout = setTimeout(() => {
      //   bottomSheetRef.current?.snapToIndex(0);
      // }, 1300);

      // return () => {
      //   clearTimeout(openTimeout);
      //   clearTimeout(closeTimeout);
      // };
    }, [])
  );


  const onFocusInput = () => {
    bottomSheetRef.current?.expand();
  }

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

      <ImageBackground
        source={{
          uri: "https://thumbs.dreamstime.com/z/indian-family-india-cartoon-indian-family-ethnic-india-wearing-traditional-hindu-clothes-taj-mahal-buildings-vector-155819081.jpg",
        }}
        resizeMode="cover"
        style={styles.imageBackground}
      />
      <CustomBottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        hideSheet={false}
        index={0}
        outsidePresBehaviour={"none"}
        animationConfigs={bouncySpring}
        onChange={(index: number) => {
          if (index === 0) Keyboard.dismiss();
          setCurrentIndex(index);
        }}
        hideIndicator={currentIndex === 1} // animate based on index
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
              labelStyle={{marginTop:20}}
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

        <Separator  />

        <CustomButton onPress={()=>console.log("hello")} text="Sign in with Google" icon={<Ionicons name="logo-google" size={20} color={darkTheme.text} />}/>
      </CustomBottomSheet>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
});
