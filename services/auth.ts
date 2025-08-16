import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import api from '../lib/api';
export interface RegisterPayload {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
}


export interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    token: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        lastOtpSent: string;
        __v: number;
    };
    message: string;
}

interface ResendOtpPayload {
    email: string;
}

interface ResendOtpResponse {
    success: boolean;
    message: string;
    nextResendTime?: string;
    remainingTime?: number;
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register',{
        firstName: payload.firstname,
        lastName: payload.lastname,
        email: payload.email,
        password: payload.password
    });
    return response.data;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse>{
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
}

export async function resendOtp(payload: ResendOtpPayload): Promise<ResendOtpResponse> {
    const response = await api.post<ResendOtpResponse>('/auth/resend-otp', payload);
    return response.data;
};

export async function loginUserWithGoogle() {
  try {
    console.log('Starting Google Sign-In...');

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const response = await GoogleSignin.signIn();
    console.log('Google sign-in response:', response);

    if (!isSuccessResponse(response)) {
      Alert.alert("Cancelled", "Sign in was cancelled");
      return null;
    }

    const idToken = response.data.idToken;
    if (!idToken) {
      Alert.alert("Error", "No ID token received from Google");
      return null;
    }

    const backendResponse = await api.post<LoginResponse>("/auth/google", { idToken });
    console.log("Backend Google Auth Response:", backendResponse);

    return backendResponse.data;

  } catch (error) {
    console.error('Google Sign-In Error:', error);

    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Alert.alert("Cancelled", "Sign in was cancelled");
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert("In Progress", "Sign in is already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert("Error", "Google Play Services not available");
          break;
        default:
          Alert.alert("Error", `Unknown error: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "An unexpected error occurred");
    }

    return null;
  }
}
