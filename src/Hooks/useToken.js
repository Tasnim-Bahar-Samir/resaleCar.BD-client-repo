import { useEffect, useState } from "react"

const useToken = (email)=>{
    const[userToken,setUserToken] = useState('')
   
        useEffect(()=>{
            if(email){
            fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data=>{
                if(data.success){
                    localStorage.setItem('resale_token',data.token)
                    setUserToken(data.token)
                }
            })
        }
        },[email])
    
    return [userToken];
}
export default useToken