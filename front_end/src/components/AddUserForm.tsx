import { Form, Input, Button, Select, Modal, notification } from "antd"
import {FC, useState} from "react"
import { getAuthToken } from "../utils/functions"
import { AuthTokenType, DataProps } from "../utils/types"
import axios, { AxiosResponse } from "axios"
import { CreateUserUrl } from "../utils/network"


interface AddUserFormProps {
    isModalOpen?: boolean
    onSuccessCallback: () => void
    onClose: () => void
}


const AddUserForm:FC<AddUserFormProps> = ({
    isModalOpen = false,
    onSuccessCallback,
    onClose
}) => {

        const [loading, setLoading] = useState(false)
        const onSubmit = async (values: DataProps) => {
            setLoading(true)
            const headers = getAuthToken() as AuthTokenType
            if(!headers) {
                return null
            }
        
            const response:AxiosResponse = await axios.post(CreateUserUrl, values, headers).catch(
                (e) => {
                    notification.error({
                        message: 'Error Creating User',
                        description: e.response?.data.error
                   })
                }
            ) as AxiosResponse
            setLoading(false)

            if(response){
                notification.success({
                    message: 'Success Creating User',
                    description: 'User Created Successfully'
               })
                onSuccessCallback()
            }
    }

    return (
        <Modal 
            title="Add User" 
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            >
            <Form layout={'vertical'} onFinish={onSubmit}>
                <Form.Item 
                    label="Email"
                    name='email'
                    rules={[{ required: true, 
                        message: 'Please input your username!'}]}
                    >
                    <Input placeholder="Email" type='email'/>
                </Form.Item>
                <Form.Item 
                    label="Name"
                    name='full_name'
                    rules={[{ required: true, 
                        message: 'Please input your name!'}]}
                    >
                    <Input placeholder="Name" type='text'/>
                </Form.Item>
                <Form.Item 
                    label="Role"
                    name='role'
                    rules={[{ required: true, 
                        message: 'Please select a role'}]}
                    >
                <Select
                    defaultValue="User"
                    options={[
                        {
                        value: 'admin',
                        label: 'Admin',
                        },
                        {
                        value: 'user',
                        label: 'Normal user',
                        },
                        {
                        value: 'reporter',
                        label: 'Reporter',
                        },
                    ]}
                />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type="primary" block loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserForm