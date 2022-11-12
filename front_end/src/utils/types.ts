import { AxiosError } from "axios"

export interface DataProps {
    [key: string]: string | boolean | number
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: {
            error: string
        }
    }
}

export interface AuthTokenType {
    Authorization: string
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

export interface DashProps {
    user?: UserType | null
}

export enum ActionTypes {
    UPDATE_USER_INFO = '[action] update user info'
}
export interface ActionProps {
    type: ActionTypes,
    payload: UserType | null
}

export interface DashProviderProps {
    state: DashProps,
    dispatch: (arg:ActionProps) => void
}