import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
    const isAuth = true;

  return (
    isAuth ? <Outlet/> : <Navigate to="/"/>
  )
}

export default Protected