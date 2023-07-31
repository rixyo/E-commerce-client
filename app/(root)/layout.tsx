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
    console.log(user)
    if(!user && !isLoading){
         redirect('/auth')
     }
 else  if(store===undefined && !storeLoading){
        redirect('/');
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