import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Public = () => {
    const isAuth = useAuth();

    return (
        isAuth.auth ? <Navigate to="/assignments" /> : <Outlet />
    )
}

export default Public