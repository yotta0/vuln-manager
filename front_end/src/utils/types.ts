import { AxiosError } from "axios"

export interface DataProps {
    [key: string]: string
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response: {
        data: {
            error: string
        }
    }
}