import { notification } from 'antd'
import axios from 'axios'
import {FC, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthComponent from '../components/AuthComponent'
import { useAuth } from '../utils/hooks'
import { LoginUrl } from '../utils/network'
import { CustomAxiosError, DataProps } from '../utils/types'

const CheckUser:FC = () => {

    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    useAuth({
        successCallback: () => {
            history('/')
        }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        const response = await axios.post(LoginUrl, {...values, is_new_user: true}).catch(
           (e: CustomAxiosError) => {
               notification.error({
                    message: 'User Check Error',
                    description: e.response?.data.error
               })
           }
        )
        if(response){
            console.log('Check completed')
        }
        setLoading(false)
    }

    return <AuthComponent 
        titleText='Verify Yourself'
        bottonText='Submit'
        linkText='Already have an account?'
        isPassword={false}
        linkPath='/login'
        onSubmit={onSubmit}
    />
}

export default CheckUser