import { createContext, FC, useReducer } from 'react'
import { ActionProps, ActionTypes, ContainerProps, DashProps, DashProviderProps } from './types'

const initialState: DashProps = {
    user: null
}

const appReducer = (state: DashProps, action: ActionProps): DashProps => {
    if (action.type === ActionTypes.UPDATE_USER_INFO){
        return {
            ...state,
            user: action.payload
        }
    }

    return state
}

export const dash = createContext<DashProviderProps>({state: initialState, dispatch:() => null})

const DashProvider: FC<ContainerProps> = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState)

    const {Provider} = dash

    return <Provider value={{state, dispatch}}>{children}</Provider>

}

export default DashProvider
