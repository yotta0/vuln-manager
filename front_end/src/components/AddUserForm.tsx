import { Form, Input, Button, Select, Modal, notification } from "antd"
import {FC, useState} from "react"
import { axiosRequest } from "../utils/functions"
import { DataProps, FormModalProps } from "../utils/types"
import { CreateUserUrl } from "../utils/network"


const AddUserForm:FC<FormModalProps> = ({
    isModalOpen = false,
    onSuccessCallback,
    onClose
}) => {

        const [loading, setLoading] = useState(false)
        const onSubmit = async (values: DataProps) => {
            setLoading(true)
        
            const response = await axiosRequest({
                method: 'post',
                url: CreateUserUrl,
                hasAuth: true,
                payload: values
            })
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