import Layout from "./Layout";
import { FC, useState } from "react";
import { logout } from "../utils/functions";
import { useAuth } from "../utils/hooks";
import { ContainerProps } from "../utils/types";

const AuthRoute: FC<ContainerProps> = ({ children }) => {
    const [loading, setLoading] = useState(true)

    useAuth({
        errorCallback: () => {
            logout()
        },
        successCallback: () => {
            setLoading(false)
        }
    })

    if (loading){
        return <div>Loading...</div>
    }

    return <Layout>
        {children}
    </Layout>
}

export default AuthRoute