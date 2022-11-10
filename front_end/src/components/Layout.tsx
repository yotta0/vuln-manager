import { FC } from 'react';
import { ContainerProps } from '../utils/types';
import Logo from "../assets/logo.svg";
import User from "../assets/user.svg";

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
                    <div className="text">Logout</div>
                </div>
            </div>
        </div>
        <div className="sidebar"></div>
        <div className="mainContent"></div>
            {children}
    </div>
}

export default Layout