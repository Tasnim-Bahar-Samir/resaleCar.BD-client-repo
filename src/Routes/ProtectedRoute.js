import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { authProvider } from '../Context/UserContext'

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(authProvider);
    const location = useLocation();
    
    if(loading){
       return <Spinner/>
    }

    if(user){
        return children;
    }

  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}

export default ProtectedRoute