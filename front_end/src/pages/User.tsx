import { Table } from "antd";
import {FC, useContext, useState} from "react";
import AddUserForm from "../components/AddUserForm";
import { dash } from "../utils/dash";

const User: FC = () => {

    const { state } = useContext(dash) 
    const [modalState, setModalState] = useState(false)

    return (
        <>
            <div className="card">
                <div className="cardHeader">
                    <h1 className="headContent">User</h1>
                    <div className="rightContent">
                        <div className="searchInput">
                            <input type="text" />
                        </div>
                        <button onClick={() => setModalState(true)}>
                            Add User
                        </button>
                    </div>
                </div>
                <br />
                <Table dataSource={dataSource} columns={columns}></Table>
            </div>
            <AddUserForm 
                onSuccessCallback={() => alert('submitted')} 
                isModalOpen={modalState}
                onClose={() => setModalState(false)}
            />
        </>
    )
}

export default User