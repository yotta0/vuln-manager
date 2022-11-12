import { notification } from "antd";
import Axios, {AxiosResponse} from "axios";
import axios from "axios";
import { tokenName } from "./data";
import { MeUrl } from "./network";
import { AuthTokenType, CustomAxiosError, DataProps, UserType } from "./types";


export const getAuthToken = ():AuthTokenType | null => {
    const accesstoken = localStorage.getItem(tokenName);
    if (!accesstoken) {
        return null;
    }

    return {Authorization: `Bearer ${accesstoken}`}
}

export const logout = () => {
    localStorage.removeItem(tokenName);
    window.location.href = '/login'
}

export const authHandler = async ():Promise<UserType  | null> => {
    const response = await axiosRequest<UserType>({url: MeUrl, hasAuth: true, showError: false})

    if(response){
        return response.data
    }

    return null
}

interface AxiosRequestProps {
    method?: 'get' | 'post' | 'put' | 'delete'
    url: string
    payload?: DataProps
    hasAuth?: boolean
    showError?: boolean
    errorObject?: {
        message: string,
        description?: string
    }
}

export const axiosRequest = async <T> ({
    method = 'get',
    url,
    payload,
    hasAuth = false,
    showError = true,
    errorObject
}: AxiosRequestProps):Promise<AxiosResponse<T> | null> => {
    
    const headers = hasAuth ? getAuthToken() : {}

    const response = await Axios({
        method,
        url,
        data: payload,
        headers: {...headers}
    }).catch(
        (e:CustomAxiosError) => {
            if(!showError)return
            notification.error({
                message: errorObject ? 
                    errorObject.message: "Operation Error",
                description: errorObject?.description ? 
                    errorObject.description: e.response?.data.error
            })
        }
    ) as AxiosResponse<T>

    if(response){
        return response
    }

    return null
} 
