import {FC, useState} from 'react'
import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError, DataProps } from '../utils/types'
import axios from 'axios'
import { LoginUrl } from '../utils/network'
import { notification } from 'antd'


const Login:FC = () => {

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        const response = await axios.post(LoginUrl, values).catch(
           (e: CustomAxiosError) => {
               notification.error({
                    message: 'Login Error',
                    description: e.response?.data.error
               })
           }
        )
        if(response){
            console.log(response)
        }
        setLoading(false)
    }

    return <AuthComponent onSubmit={onSubmit} loading={loading}/>
}

export default Login