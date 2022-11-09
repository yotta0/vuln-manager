import {FC, useEffect, useState} from "react";
import { authHandler, logout } from "../utils/functions";
import { useAuth } from "../utils/hooks";
import { UserType } from "../utils/types";

const Home: FC = () => {

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

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home