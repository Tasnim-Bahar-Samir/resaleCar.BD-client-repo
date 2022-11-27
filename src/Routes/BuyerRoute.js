import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { authProvider } from '../Context/UserContext';
import useRole from '../Hooks/useRole';

const BuyerRoute = ({children}) => {
    
    const {user,loading} = useContext(authProvider);
    const{isBuyer,isLoading} = useRole(user?.email)
    const location = useLocation();
    
    if(loading || isLoading){
       return <Spinner/>
    }

    if(user && isBuyer){
        return children;
    }

  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}

export default BuyerRoute