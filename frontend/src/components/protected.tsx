import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Protected = () => {
    const isAuth = useAuth();
    if (isAuth.auth === null) return <p>Loading...</p>;
    return (
        isAuth.auth ? <Outlet /> : <Navigate to="/" />
    )
}

export default Protected