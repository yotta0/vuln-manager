import {FC, useContext} from "react";
import { dash } from "../utils/dash";

const User: FC = () => {

    const { state } = useContext(dash) 

    return (
        <div>
            <h1>User</h1>
        </div>
    )
}

export default User