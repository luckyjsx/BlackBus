import api from "@/lib/api";

export interface VerifyOtpPayload{
    email: string;
    otp: string;
}

export interface VerifyOtpResponse{
    success: boolean;
    message: string;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
    const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', payload);
    return response.data;
}