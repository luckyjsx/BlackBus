import CustomButton from "@/components/common/CustomButton";
import CustomTextInput from "@/components/common/CustomTextInput";
import Separator from "@/components/common/Seprator";
import ContentContainer from "@/components/content-container/ContentContainer";
import { ThemedView } from "@/components/themed/ThemedView";
import { darkTheme, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import z from "zod";

const registerSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
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
type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form is valid, submitted data:", data);
  };
  return (
    <ContentContainer
      style={{ paddingHorizontal: 16, backgroundColor: theme.background }}
    >
      <ThemedView style={styles.formContent}>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label={"Firstname"}
              bordered
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Your Firstname"
              errorMsg={errors.firstname?.message}
              // onFocus={onFocusInput}
              labelStyle={{ marginTop: 20 }}
            />
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label={"Lastname"}
              bordered
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Your Lastname"
              errorMsg={errors.lastname?.message}
              // onFocus={onFocusInput}
            />
          )}
        />
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
              // onFocus={onFocusInput}
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
              // onFocus={onFocusInput}
            />
          )}
        />

        <CustomButton text="Sign Up" onPress={handleSubmit(onSubmit)} />
        <Separator />
        <CustomButton
          onPress={() => console.log("hello")}
          text="Sign in with Google"
          icon={
            <Ionicons name="logo-google" size={20} color={darkTheme.text} />
          }
        />
        <Link
          href={"/auth/login"}
          style={[styles.dontHaveAccountText, { color: theme.link }]}
        >
          Already Have an account, Please Login
        </Link>
      </ThemedView>
    </ContentContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  formContent: {
    paddingTop: 10,
  },
    dontHaveAccountText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop:10
  },
});
