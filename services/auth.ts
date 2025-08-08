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
    
    console.log("laxman....",response.data)
    return response.data;
}

export async function resendOtp(payload: ResendOtpPayload): Promise<ResendOtpResponse> {
    const response = await api.post<ResendOtpResponse>('/auth/resend-otp', payload);
    return response.data;
};