import {FC} from 'react'
import {Form, Input, Button} from 'antd'

const AuthComponent:FC = () => {
    return <div className='login'>
        <div className="inner">
            <div className="header">
                <h3>Sign In</h3>
                <h2>Vuln Manager</h2>
            </div>
            <Form layout={'vertical'}>
                <Form.Item label="Email">
                    <Input placeholder="input placeholder" type='email'/>
                </Form.Item>
                <Form.Item label="Password">
                    <Input placeholder="input placeholder" type='password'/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default AuthComponent