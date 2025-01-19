import axios from 'axios';
import { ResponseType } from "../types/login.types";
import { GroupsTypes, ProviderTypes } from '../types/dashboard.types';
const API_URL = import.meta.env.VITE_BE_URL;


export const GetGames=async():Promise<ResponseType>=>{
    try {
        const response = await axios.get(`${API_URL}/api/dashboard/getData`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data as ResponseType
    } catch (error: unknown) {  
        return { status: 'fail', message: (error as Error).message } as ResponseType
    }
}

export const GetProvider=async():Promise<ResponseType<ProviderTypes[]>>=>{
    try {
        const response = await axios.get(`${API_URL}/api/dashboard/getProviders`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data as ResponseType<ProviderTypes[]>
    } catch (error: unknown) {  
        return { status: 'fail', message: (error as Error).message } as ResponseType<ProviderTypes[]>
    }
}


export const GetGroups=async():Promise<ResponseType<GroupsTypes[]>>=>{
    try {
        const response = await axios.get(`${API_URL}/api/dashboard/getGroups`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data as ResponseType<GroupsTypes[]>
    } catch (error: unknown) {  
        return { status: 'fail', message: (error as Error).message } as ResponseType<GroupsTypes[]>
    }
}
