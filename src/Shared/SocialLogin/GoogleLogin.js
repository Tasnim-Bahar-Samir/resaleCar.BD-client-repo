import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useLocation, useNavigate } from 'react-router-dom'
import { authProvider } from '../../Context/UserContext'
import useToken from '../../Hooks/useToken'

const GoogleLogin = () => {
    const {googleLogin} = useContext(authProvider)
    const googleProvider = new GoogleAuthProvider;
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate()
    const[userEmail,setUserEmail] = useState('')
    const [userToken] = useToken(userEmail)
    if(userToken){
        navigate(from)
    }
    const role = 'buyer'
    const handleGoogleLogin = ()=>{
        googleLogin(googleProvider)
        .then(data => {
            const{displayName,email,photoURL} = data?.user;
            saveUserToDb(displayName,email,role,photoURL)
        })
        .catch(err => console.error(err))
    }

    const saveUserToDb = (name,email,role,image)=>{
        const user = {name,email,role,image}
        fetch('http://localhost:5000/users',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setUserEmail(email)
        })
    }
    
  return (
    <div>
        <button onClick={handleGoogleLogin} className='border-2 rounded-md p-2 w-full flex items-center justify-center gap-3'><FcGoogle className='w-10'/> Google Login</button>
    </div>
  )
}

export default GoogleLogin