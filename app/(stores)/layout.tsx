// layout for store page
"use client"
import { Loader } from "@/components/ui/loadert";
import { useStoreModal } from "@/hooks/use-store-model";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirstStore from "@/hooks/useFirstStore";
import { redirect } from "next/navigation";
export default  function SetupLayout({
    children,
}:{
    children:React.ReactNode
}){
    // this is the hook that gets the first store
    const {data:store,isLoading:storeLoading}=useFirstStore()
    // this is the hook that gets the current user
    const {data:user,isLoading}=useCurrentUser()
    const onOpen = useStoreModal(state=>state.onOpen);
    if(storeLoading) return (
       <Loader/>
    )
    else if(!store && !storeLoading){
        onOpen()
    }
    if(user?.userRole!=="ADMIN" && !isLoading){
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