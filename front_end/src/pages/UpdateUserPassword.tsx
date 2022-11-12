import { notification } from 'antd'
import {FC, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthComponent from '../components/AuthComponent'
import { dash } from '../utils/dash'
import { axiosRequest } from '../utils/functions'
import { useAuth } from '../utils/hooks'
import { UpdatePasswordUrl } from '../utils/network'
import { ActionTypes, DataProps } from '../utils/types'

const UpdateUserPassword:FC = () => {

    const [loading, setLoading] = useState(false)
    const {state: {updatePasswordUserId}, dispatch} = useContext(dash)
    const history = useNavigate()

    useEffect(() => {
        if(!updatePasswordUserId){
            history('/')
        }
    }, [])
    useAuth({
        successCallback: () => {
            history('/')
        }
    })

    const onSubmit = async (values: DataProps) => {
        if(values['password'] !== values['cpassword']){
            notification.error({
                message: 'Password Mismatch',
                description: 'Your password and confirm password do not match'
            })
            return
        }
        setLoading(true)
        const response = await axiosRequest({
            method: 'post',
            url: UpdatePasswordUrl,
            payload: {...values, user_id: updatePasswordUserId}
        })
        if(response){
            dispatch({
                type:ActionTypes.UPDATE_PASSWORD_USER_ID, 
                payload: null
            })
            notification.success({
                message: 'Password Updated',
                description: 'Your password has been updated successfully'
            })
            history('/login')
                
        }
        setLoading(false)
    }

    return <AuthComponent 
        titleText='Create Password'
        bottonText='Update'
        linkText='Already have an account?'
        linkPath='/check-user'
        isUpdatePassword={true}
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default UpdateUserPassword