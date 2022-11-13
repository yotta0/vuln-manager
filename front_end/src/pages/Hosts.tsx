import { Button } from "antd";
import {FC, useEffect, useState} from "react";
import AddUserForm from "../components/AddUserForm";
import { axiosRequest } from "../utils/functions";
import { DataProps } from "../utils/types";
import { UsersUrl } from "../utils/network";
import ContentLayout from "../components/ContentLayout";

interface UserProps{
    created_at: string
    email: string
    full_name: string
    is_active: string
    last_login: string
    role: string
    key?: number
    id: number
}

const Hosts: FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [users, setUsers] = useState<UserProps[]>()

      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Is Active',
            dataIndex: 'is_active',
            key: 'is_active',
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'last_login',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        }
      ];

    const getUsers = async () => {        
        const response = await axiosRequest<UserProps[]>({
            url: UsersUrl,
            hasAuth: true,
            showError: false
        })
        
        if(response){
            const data = response.data.map(
                (item) => ({...item, key: item.id, is_active: item.is_active.toString()})
            )
            setUsers(data)
            setFetching(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const onCreateUser = () => {
        setModalState(false)
        setFetching(true)
        getUsers()
    }

    return (
        <ContentLayout
            pageTitle='Users'
            setModalState={setModalState}
            dataSource={(users as unknown) as DataProps[]}
            columns={columns}
            fetching={fetching}
            extraButton={<Button type='primary'>Add hosts (CSV)</Button>}
        >
            <AddUserForm 
                onSuccessCallback={onCreateUser} 
                isModalOpen={modalState}
                onClose={() => setModalState(false)}
            />
        </ContentLayout>
    )
}

export default Hosts