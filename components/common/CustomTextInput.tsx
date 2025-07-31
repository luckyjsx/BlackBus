import { useTheme } from "@/lib/theme";
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from "react";
import { Keyboard, StyleSheet, } from "react-native";
import { TextInput, TextInputProps } from 'react-native-paper';
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";

export type CustomTextInputProps = TextInputProps & {
  label?: string;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  errorMsg?: string;
  labelBackgroundColor?: string;
  textboxBackgroundColor?: string;
};

const CustomTextInput = ({
  label,
  style,
  onBlur,
  secureTextEntry,
  bordered,
  disabled,
  errorMsg,
  labelBackgroundColor,
  textboxBackgroundColor,
  ...rest
}: CustomTextInputProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ThemedView>
      {label && (
        <ThemedView style={styles.labelContainer}>
                <ThemedText style={styles.label}>
                    {label}
                </ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.inputContainer}>
        <TextInput
            style={[
                {
                    color:theme.text,
                    backgroundColor:theme.background
                },
                styles.textInput,
                styles.inputStyle,
                bordered && {borderColor:theme.lightSilver},
                isFocused && {borderColor:theme.pink},
                style
            ]}
            cursorColor={theme.lightSilver}
            selectionColor={theme.lightSilver}
            contentStyle={styles.textInput}
            placeholderTextColor={theme.placeholder}
            underlineColor="transparent"
            underlineStyle={styles.underline}
            onSubmitEditing={Keyboard.dismiss}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>{
              setIsFocused(false);
              onBlur?.();
            }}
            secureTextEntry={secureTextEntry && isPasswordVisible}
            right={
            secureTextEntry && (
              <TextInput.Icon
                icon={() => (
                  <Feather
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={20}
                    color={theme.placeholder}
                  />
                )}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )
          }
          disabled={disabled}
          {...rest}
        />
        {
          errorMsg && (
            <ThemedText style={styles.errorText}
            >
              {errorMsg}
            </ThemedText>
          )
        }
      </ThemedView>
    </ThemedView>
  );
};

export default CustomTextInput;

export const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingLeft: 12,
  },
  label: {
    fontSize: 20,
    fontWeight:"600"
  },
  labelIcon: {
    marginBottom: 4,
  },
  inputContainer: {
    position: "relative",
    gap: 8,
  },
  underline: {
    display: "none",
  },
  inputStyle: {
    height: 52,
  },
  textAreaStyle: {
    height: 108,
    paddingTop: 20,
    paddingBottom: 32,
    textAlignVertical: "top",
  },
  textInput: {
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    borderWidth: 1,
    borderColor: "transparent",
  },
  errorText: {
    paddingLeft: 12,
  },
  icon: {
    height: 24,
    width: 24,
  },
  characterCount: {
    position: "absolute",
    bottom: 8,
    right: 20,
    fontSize: 12,
  },
});
