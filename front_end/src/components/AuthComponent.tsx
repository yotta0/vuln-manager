import {FC} from 'react'
import {Form, Input, Button} from 'antd'
import {Link} from 'react-router-dom'
import { DataProps} from '../utils/types'

interface AuthComponentProps {
    titleText?: string
    isPassword?: boolean
    bottonText?: string
    linkText?: string
    linkPath?: string
    onSubmit: (values: DataProps) => void,
    loading?: boolean
}

const AuthComponent:FC<AuthComponentProps> = ({
    titleText = 'Sign In',
    isPassword = true,
    bottonText = 'Login',
    linkText = 'New User',
    linkPath = '/check-user',
    onSubmit,
    loading = false
}) => {
    
    return <div className='login'>
        <div className="inner">
            <div className="header">
                <h3>{titleText}</h3>
                <h2>Vuln Manager</h2>
            </div>
            <Form layout={'vertical'} onFinish={onSubmit}>
                <Form.Item 
                    label="Email"
                    name='email'
                    rules={[{ required: true, message: 'Please input your username!'}]}
                    >
                    <Input placeholder="input placeholder" type='email'/>
                </Form.Item>
                {isPassword && <Form.Item 
                    label="Password"
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!'}]}
                    >
                    <Input placeholder="input placeholder" type='password'/>
                </Form.Item>}
                <Form.Item>
                    <Button htmlType='submit' type="primary" block loading={loading}>{bottonText}</Button>
                </Form.Item>
            </Form>
            <Link to={linkPath} >{linkText}</Link>
        </div>
    </div>
}

export default AuthComponent