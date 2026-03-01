import { Navigate, Outlet } from 'react-router-dom';

const Public = () => {
    const isAuth = true;

    return (
        isAuth ? <Navigate to="/assignments" /> : <Outlet />
    )
}

export default Public