import { AxiosError } from "axios"

export interface DataProps {
    [key: string]: string | boolean | number | null
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
    updatePasswordUserId: number | null
}

export enum ActionTypes {
    UPDATE_USER_INFO = '[action] update user info',
    UPDATE_PASSWORD_USER_ID = '[action] update password user id'
}
export type ActionProps = {
    type: ActionTypes.UPDATE_USER_INFO,
    payload: UserType | null
} | {
    type: ActionTypes.UPDATE_PASSWORD_USER_ID,
    payload: number | null
}

export interface DashProviderProps {
    state: DashProps,
    dispatch: (arg:ActionProps) => void
}

export interface FormModalProps {
    isModalOpen?: boolean
    onSuccessCallback: () => void
    onClose: () => void
}