import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { authProvider } from '../Context/UserContext';
import useRole from '../Hooks/useRole';

const AdminRoutes = ({children}) => {
    
    const {user,loading} = useContext(authProvider);
    const{isAdmin,isLoading} = useRole(user?.email)
    const location = useLocation();
    
    if(loading || isLoading){
       return <Spinner/>
    }

    if(user && isAdmin){
        return children;
    }

  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}

export default AdminRoutes