import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'


export const authProvider = createContext();

const auth = getAuth(app)
const UserContext = ({ children }) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)

    const createUser = (email,password)=>{
        // setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUser = (profile) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }

    const userLogin = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const userLogout = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
      const unsubSubscribe = onAuthStateChanged(auth, currentUser =>{
        if(currentUser){
            setUser(currentUser)
            setLoading(false)
        }
        
      })
    
      return () => {
        unsubSubscribe()
      }
    }, [])
    



    const userInfo = {user,loading,createUser,updateUser,userLogin,userLogout}
  return <authProvider.Provider value={userInfo}>
    {children}
  </authProvider.Provider>
};

export default UserContext;
