import {FC} from 'react'
import {Form, Input, Button} from 'antd'
import {Link} from 'react-router-dom'

interface AuthComponentProps {
    titleText?: string,
    isPassword?: boolean,
    bottonText?: string,
    linkText?: string,
    linkPath?: string
}

const AuthComponent:FC<AuthComponentProps> = ({
    titleText = 'Sign In',
    isPassword = true,
    bottonText = 'Login',
    linkText = 'New User',
    linkPath = '/check-user'
}) => {
    return <div className='login'>
        <div className="inner">
            <div className="header">
                <h3>{titleText}</h3>
                <h2>Vuln Manager</h2>
            </div>
            <Form layout={'vertical'}>
                <Form.Item label="Email">
                    <Input placeholder="input placeholder" type='email'/>
                </Form.Item>
                {isPassword && <Form.Item label="Password">
                    <Input placeholder="input placeholder" type='password'/>
                </Form.Item>}
                <Form.Item>
                    <Button type="primary" block>{bottonText}</Button>
                </Form.Item>
            </Form>
            <Link to={linkPath} >{linkText}</Link>
        </div>
    </div>
}

export default AuthComponent