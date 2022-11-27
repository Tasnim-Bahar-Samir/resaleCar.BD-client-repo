import { useEffect, useState } from "react"

const useRole = (email)=>{
    const [isAdmin,setIsAdmin] = useState(false)
    const [isSeller,setIsSeller] = useState(false)
    const [isBuyer,setIsBuyer] = useState(false)
    const[isLoading,setIsLoading] = useState(true)
useEffect(()=>{
    if(email){
        fetch(`http://localhost:5000/users/admin/${email}`)
        .then(res => res.json())
        .then(data=>{
            setIsLoading(false)
            if(data.admin){
                setIsAdmin(true)
            }else if(data.seller){
                setIsSeller(true)
            }else if(data.buyer){
                setIsBuyer(true)
            }
        })
    }
},[email])
return {isAdmin,isSeller,isBuyer,isLoading}
}
export default useRole;