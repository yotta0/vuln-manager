import { FC } from 'react';
import { ContainerProps } from '../utils/types';
import UsersGroup from "../assets/users_group.svg";
import Dashboard from "../assets/dashboard.svg";
import User from "../assets/user.svg";
import { logout } from '../utils/functions';

const Layout: FC<ContainerProps> = ({ children }) => {
    return <div className="layout">
        <div className="header">
            <div className="brand">
                <h2 className="logo">Vulnerability Manager</h2>
            </div>
            <div className="rightNav">
                <div className="userAvatar">
                    <img src={User} alt="user" />
                    <div className="text">Davi</div>
                </div>
                <div className="logoutButton">
                    <div className="text" onClick={logout}>Logout</div>
                </div>
            </div>
        </div>
        <div className="bodyHolder">
            <div className="sideBar">
                <ul>
                    <li>
                        <img src={Dashboard} alt="dashboard logo" />
                        <div className="text">Dashboard</div>
                    </li>
                    <li>
                        <img src={UsersGroup} alt="users group logo" />
                        <div className="text">Users</div>
                    </li>
                </ul>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </div>
    </div>
}

export default Layout