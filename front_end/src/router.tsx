import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {FC} from 'react'
import Login from './pages/Login'
import CheckUser from './pages/CheckUser'
import Home from './pages/Home'
import AuthRoute from './components/AuthRoute'

const Router:FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/check-user' element={<CheckUser />} />

            <Route path='/' element={
                <AuthRoute>
                    <Home />
                </AuthRoute>} />
        </Routes>
    </BrowserRouter>
}

export default Router
