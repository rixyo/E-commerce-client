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
  if(store===undefined && !storeLoading){
        redirect('/')
    }
   else if(!user && !isLoading){
        redirect('/auth')
    }
        else if(store && !storeLoading && store.userId===user?.id){
        redirect(`/${store.id}`)
        }

  
     return(
            <>
            {children}
            </>
     )
}