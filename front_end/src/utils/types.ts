import { AxiosError } from "axios"

export interface DataProps {
    [key: string]: string
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: {
            error: string
        }
    }
}

export interface AuthTokenType {
    headers: {
        Authorization: string
    }
}

export interface UserType {
    email: string
    full_name: string
    id: string
    created_at: string
    role: string
    last_login: string
}

export interface AuthProps {
    errorCallback?: () => void,
    successCallback?: () => void
}

export interface ContainerProps {
    children: React.ReactNode
}