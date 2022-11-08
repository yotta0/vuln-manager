import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import {FC} from 'react'

const Router:FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
}

export default Router
