export interface User {
    username: string,
    password?: string,
}

export interface ResponseType<T = unknown> {
    status?: string,
    error?: string,
    data?: T,
    success?: boolean
}

export interface FieldDataTypes {
    username: string;
    password: string;
}

export interface FieldDataErrorTypes {
    passwordError: string;
    usernameError: string;
}

export interface LoginResponseData {
    username: string;
    token: string;
}