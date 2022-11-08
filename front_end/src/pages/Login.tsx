import {FC} from 'react'
import {Form, Input, Button} from 'antd'

const Login:FC = () => {
    return <div className='login'>
        <div className="inner">
            <div className="header">
                <h3>Sign In</h3>
                <h2>Vuln Manager</h2>
            </div>
            <Form
                layout={'vertical'}
            >
                <Form.Item label="Field A">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="Field B">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Login