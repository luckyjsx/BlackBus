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

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register',{
        firstName: payload.firstname,
        lastName: payload.lastname,
        email: payload.email,
        password: payload.password
    });
    return response.data;
}