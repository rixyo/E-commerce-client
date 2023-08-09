// layout for store page
"use client"
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
        <div className="flex justify-center items-center h-full text-xl">Do You Know A fox cann`&lsquo;`t lough</div>
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