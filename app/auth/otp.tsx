// screens/Otp.tsx
import OtpInput from '@/components/auth/OtpInput'
import ContentContainer from '@/components/content-container/ContentContainer'
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { useTheme } from '@/lib/theme'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const Otp = () => {
    const theme = useTheme();
    const [currentOtp, setCurrentOtp] = useState('');

    // Handle OTP completion
    const handleOtpComplete = (otp: string) => {
        // You can add auto-verification logic here if needed
    };

    // Handle OTP change
    const handleOtpChange = (otp: string) => {
        setCurrentOtp(otp);
    };

    return (
        <ContentContainer style={{ backgroundColor: theme.background }}>
            <ThemedView style={styles.content}>
                <ThemedText style={[styles.title, { color: theme.text }]}>
                    OTP Verification
                </ThemedText>
                
                <ThemedText style={[styles.subtitle, { color: theme.text || theme.text }]}>
                    Enter the 6-digit code sent to your email
                </ThemedText>

                <OtpInput 
                    onOtpComplete={handleOtpComplete}
                    onOtpChange={handleOtpChange}
                    autoVerify={false} // Set to true if you want auto-verification
                />
            </ThemedView>
        </ContentContainer>
    )
}

export default Otp

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent:"center",
        alignItems: 'center',
        marginBottom:50
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
});
