import {FC, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthComponent from '../components/AuthComponent'
import { dash } from '../utils/dash'
import { axiosRequest } from '../utils/functions'
import { useAuth } from '../utils/hooks'
import { LoginUrl } from '../utils/network'
import { ActionTypes, DataProps } from '../utils/types'

interface CheckUserProps {
    user_id: string
}
const CheckUser:FC = () => {

    const [loading, setLoading] = useState(false)
    const {dispatch} = useContext(dash)
    const history = useNavigate()

    useAuth({
        successCallback: () => {
            history('/')
        }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        const response = await axiosRequest<CheckUserProps>({
            method: 'post',
            url: LoginUrl,
            payload: {...values, is_new_user: true}
        })
        if(response){
            dispatch({type:ActionTypes.UPDATE_PASSWORD_USER_ID, 
                payload: parseInt(response.data.user_id)})
            history('/create-password')
        }
        setLoading(false)
    }

    return <AuthComponent 
        titleText='Verify Yourself'
        bottonText='Submit'
        linkText='Already have an account?'
        isPassword={false}
        linkPath='/login'
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default CheckUser