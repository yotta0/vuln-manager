import { Form, Input, Button, Modal, notification } from "antd"
import {ChangeEvent, FC, useState} from "react"
import { axiosRequest } from "../utils/functions"
import { DataProps, FormModalProps } from "../utils/types"
import { HostFormCSVUrl } from "../utils/network"


const AddHostFormCSV:FC<FormModalProps> = ({
    isModalOpen = false,
    onSuccessCallback,
    onClose
}) => {

        const [loading, setLoading] = useState(false)
        const [csvFile, setCSVFile] = useState<File>()

        const onSubmit = async (values: DataProps) => {
            setLoading(true)
            
            if(!csvFile)  return
            
            const formItem = new FormData()
            formItem.append("data", csvFile)

            const response = await axiosRequest({
                method: 'post',
                url: HostFormCSVUrl,
                hasAuth: true,
                payload: formItem
            })
            setLoading(false)

            if(response){
                notification.success({
                    message: 'Success adding hosts',
                    description: 'Host added Successfully'
               })
                onSuccessCallback()
            }
    }

    const handleFileChange = async (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setCSVFile(e.target.files[0])
        }
    }

    return (
        <Modal 
            title="Add host (CSV)" 
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
            >
            <Form layout={'vertical'} onFinish={onSubmit}>
                <Form.Item 
                    label="Select File (CSV)"
                    rules={[{
                        required: true,
                        message: 'Please select a file'
                    }]}
                    >
                    <Input 
                        type='file'
                        accept='.csv'
                        onChange={handleFileChange}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type="primary" block loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddHostFormCSV