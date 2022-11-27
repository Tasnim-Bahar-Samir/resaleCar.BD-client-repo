import { useEffect, useState } from "react"

const useRole = (email)=>{
    const [isAdmin,setIsAdmin] = useState(false)
    const [isSeller,setIsSeller] = useState(false)
    const [isBuyer,setIsBuyer] = useState(false)
    const[isLoading,setIsLoading] = useState(true)
useEffect(()=>{
    if(email){
        fetch(`https://assignment-12-server-side-kohl.vercel.app/users/admin/${email}`)
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