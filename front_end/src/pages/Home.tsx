import {FC, useEffect, useState} from "react";
import { authHandler, Logout } from "../utils/functions";
import { UserType } from "../utils/types";

const Home: FC = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const user:UserType | null = await authHandler()
            if (!user) {
                Logout()
                return 
            }
            setLoading(false)
        }
        checkUser()
    }, [])

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