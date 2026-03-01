import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Protected = () => {
    const isAuth = useAuth();
  return (
    isAuth.auth ? <Outlet/> : <Navigate to="/"/>
  )
}

export default Protected