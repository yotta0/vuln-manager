import { useEffect } from "react"
import { authHandler } from "./functions"
import { AuthProps, UserType } from "./types"

export const useAuth = async ({errorCallback, successCallback}:AuthProps) => {
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
                successCallback()
            }
        }
        checkUser()
    }, [])
}
