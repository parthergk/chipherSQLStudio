import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Public = () => {
    const isAuth = useAuth();
    if (isAuth.auth === null) return <p>Loading...</p>;
    return (
        isAuth.auth ? <Navigate to="/assignments" /> : <Outlet />
    )
}

export default Public