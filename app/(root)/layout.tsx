"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirstStore from "@/hooks/useFirstStore";
import { redirect } from "next/navigation";
export default  function SetupLayout({
    children,
}:{
    children:React.ReactNode
}){
    const {data:user,isLoading}=useCurrentUser()
    const {data:store,isLoading:storeLoading}=useFirstStore()
    if(!user && !isLoading){
        redirect('/auth')
    }
    else if(!store && storeLoading){
   return  <div
        className="flex justify-center items-center h-screen"
        >Loading.......</div>
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