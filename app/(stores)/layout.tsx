"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirstStore from "@/hooks/useFirstStore";
import { redirect } from "next/navigation";
export default  function SetupLayout({
    children,
}:{
    children:React.ReactNode
}){
    const {data:store,isLoading:storeLoading}=useFirstStore()
    const {data:user,isLoading}=useCurrentUser()
    if(isLoading || storeLoading) return (
        <div className="flex justify-center items-center h-full text-xl">Do You Know A fox canot lough</div>
    )

    
    if(!user && !isLoading){
         redirect('/')
     }
        else if(store && !storeLoading){
        redirect(`/${store.id}`)
        }
     return(
            <>
            {children}
            </>
     )
}