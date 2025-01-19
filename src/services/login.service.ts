import axios from 'axios';
import { LoginResponseData, ResponseType, User } from "../types/login.types";
const API_URL = process.env.VITE_BE_URL || 'http://192.168.1.3:3001';
// const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BE_URL) || 'http://localhost:3001';

console.log("API_URL",API_URL);

export const UserLogin = async (params: User): Promise<ResponseType<LoginResponseData>> => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, params);
        return response.data as ResponseType<LoginResponseData>
    } catch (error: unknown) {
        return { status: 'fail', message: (error as Error).message } as ResponseType<LoginResponseData>
    }
}

export const UserLogout = async (): Promise<ResponseType> => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/logout`);
        return response.data as ResponseType
    } catch (error: unknown) {
        return { status: 'fail', message: (error as Error).message } as ResponseType
    }
}