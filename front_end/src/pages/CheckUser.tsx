import {FC} from 'react'
import AuthComponent from '../components/AuthComponent'

const CheckUser:FC = () => {
    return <AuthComponent 
        titleText='Verify Yourself'
        bottonText='Submit'
        linkText='Already have an account?'
        isPassword={false}
        linkPath='/login'
    />
}

export default CheckUser