import { FC, useEffect, useState } from 'react';
import { ContainerProps } from '../utils/types';
import UsersGroup from "../assets/users_group.svg";
import Dashboard from "../assets/dashboard.svg";
import User from "../assets/user.svg";
import Host from "../assets/host.svg"
import { logout } from '../utils/functions';
import { Link, useLocation } from 'react-router-dom';

const Layout: FC<ContainerProps> = ({ children }) => {

    const location = useLocation()
    const [activePath, setActivePath] = useState("/")

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])

    const isActive = (path: string):string => {
        switch(activePath){
            case path:
                return "active"
            default:
                return ""
        }
    }

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
                    <Link to="/">
                    <li className={isActive("/")}>
                        <img src={Dashboard} alt="dashboard logo" />
                        <div className="text">Dashboard</div>
                    </li>
                    </Link>
                    <Link to="/users">
                    <li className={isActive("/users")}>
                        <img src={UsersGroup} alt="users group logo" />
                        <div className="text">Users</div>
                    </li>
                    </Link>
                    <Link to="/hosts">
                    <li className={isActive("/hosts")}>
                        <img src={Host} alt="Hosts" />
                        <div className="text">Hosts</div>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </div>
    </div>
}

export default Layout