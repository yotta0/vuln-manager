import { useContext, useEffect } from "react"
import { dash } from "./dash"
import { authHandler } from "./functions"
import { ActionTypes, AuthProps, UserType } from "./types"

export const useAuth = async ({errorCallback, successCallback}:AuthProps) => {
    const {dispatch} = useContext(dash)
    
    useEffect(() => {
        const checkUser = async () => {
            const user:UserType | null = await authHandler()
            if (!user) {
                if(errorCallback){
                    errorCallback()
                }
                return 
            }
            if(successCallback){
                dispatch({type: ActionTypes.UPDATE_USER_INFO, payload: user})
                successCallback()
            }
        }
        checkUser()
    }, [])
}
