// components/auth/OtpInput.tsx
import { useTheme } from "@/lib/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import z from "zod";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";

const otpSchema = z.object({
  digit1: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
  digit2: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
  digit3: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
  digit4: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
  digit5: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
  digit6: z.string().min(1).max(1).regex(/^\d$/, "Must be a number"),
});

type OtpFormData = z.infer<typeof otpSchema>;

interface OtpInputProps {
  onOtpComplete?: (otp: string) => void;
  onOtpChange?: (otp: string) => void;
  autoVerify?: boolean;
}

const OtpInput = ({
  onOtpComplete,
  onOtpChange,
  autoVerify = false,
}: OtpInputProps) => {
  const theme = useTheme();
  const inputRefs = useRef<any[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const otpString = Object.values(watchedValues).join("");

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    onOtpChange?.(otpString);

    if (otpString.length === 6 && isValid) {
      onOtpComplete?.(otpString);

      if (autoVerify) {
        handleVerifyOtp(otpString);
      }
    }
  }, [watchedValues, isValid]);

  const fieldNames: (keyof OtpFormData)[] = [
    "digit1",
    "digit2",
    "digit3",
    "digit4",
    "digit5",
    "digit6",
  ];

  const handleInputChange = (
    text: string,
    index: number,
    onChange: (value: string) => void
  ) => {
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length <= 1) {
      onChange(numericText);

      if (numericText.length === 1) {
        const values = getValues();

        for (let i = index + 1; i < 6; i++) {
          const fieldName = fieldNames[i];
          if (!values[fieldName]) {
            inputRefs.current[i]?.focus();
            break;
          }
        }
      }
    }
  };

 const handleKeyPress = (
  nativeEvent: any,
  index: number,
  currentValue: string
) => {
  if (nativeEvent.key === "Backspace") {
    if (currentValue !== "") {
      setValue(fieldNames[index], "");
    } else if (index > 0) {
      const prevIndex = index - 1;
      inputRefs.current[prevIndex]?.focus();
      setValue(fieldNames[prevIndex], ""); // This clears the previous value
    }
  }
};



  const handlePaste = (text: string, index: number) => {
    const numbers = text.replace(/[^0-9]/g, "");
    const digits = numbers.split("").slice(0, 6);

    digits.forEach((digit, i) => {
      const fieldIndex = index + i;
      if (fieldIndex < 6) {
        setValue(fieldNames[fieldIndex], digit);
      }
    });

    const nextFocusIndex = Math.min(index + digits.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      console.log("Verifying OTP:", otp);
    } catch (error) {
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    }
  };

  const onSubmit = (data: OtpFormData) => {
    const otp = Object.values(data).join("");
    handleVerifyOtp(otp);
  };

  const clearOtp = () => {
    reset();
    inputRefs.current[0]?.focus();
  };

  const resendOtp = async () => {
    try {
      console.log("Resending OTP...");
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.otpContainer}>
        {fieldNames.map((fieldName, index) => (
          <Controller
            key={fieldName}
            control={control}
            name={fieldName}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.inputStyle,
                  {
                    borderColor: value
                      ? theme.pink
                      : theme.lightSilver,
                    backgroundColor: value
                      ? `${theme.pink}15`
                      : theme.background,
                  },
                ]}
                value={value}
                onChangeText={(text) => {
                  if (text.length > 1) {
                    handlePaste(text, index);
                  } else {
                    handleInputChange(text, index, onChange);
                  }
                }}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent, index, value)
                }
                keyboardType="numeric"
                maxLength={6}
                textAlign="center"
                bordered
                errorMsg=""
                contentStyle={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 18,
                  fontWeight: "700",
                  paddingHorizontal: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                selectionColor={`${theme.pink}30`}
              />
            )}
          />
        ))}
      </ThemedView>

      <ThemedView style={styles.errorContainer}>
        {Object.values(errors).some((error) => error) && (
          <ThemedText style={[styles.errorText, { color: theme.error }]}>
            Please fill all OTP digits
          </ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.actionContainer}>
        <CustomButton text="Verify Otp" onPress={handleSubmit(onSubmit)} />

        <ThemedView style={styles.secondaryActions}>
          <TouchableOpacity style={styles.actionButton} onPress={clearOtp}>
            <ThemedText
              style={[styles.actionButtonText, { color: theme.text }]}
            >
              Clear
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={resendOtp}>
            <ThemedText
              style={[styles.actionButtonText, { color: theme.pink }]}
            >
              Resend OTP
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    gap: 8,
  },
  inputStyle: {
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  actionContainer: {
    marginTop: 25,
    width: "100%",
    paddingHorizontal: 20,
  },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
