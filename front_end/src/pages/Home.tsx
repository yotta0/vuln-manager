import {FC, useContext} from "react";
import { dash } from "../utils/dash";

const Home: FC = () => {

    const { state } = useContext(dash) 

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home