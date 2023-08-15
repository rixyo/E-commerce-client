// Note: This is a layout for dashboard
"use client"
import Navbar from "@/components/Navbar"
import { Loader } from "@/components/ui/loadert"
import useCurrentUser from "@/hooks/useCurrentUser"
import useStore from "@/hooks/useStoreById"
import { redirect } from "next/navigation"


export default  function DashBoardLayout({
  children,
  params,
}: {
  children: React.ReactNode
    params: {storeId:string}
}) {
  // this is the hook that gets the store by id
  const {data:store,isLoading:storeLoading}=useStore(params.storeId)
  // this is the hook that gets the current user
  const {data:user,isLoading}=useCurrentUser()
  // if the user is not admin and the data is not loading then redirect to home page
  if(user?.userRole!=="ADMIN" && !isLoading){
    redirect('/')
  }
  // if the store id is not provided or is undefined then redirect to store page
   else if(!params.storeId || params.storeId==='undefined'){
    redirect('/store')
  }
  // this is the loading state
  else if(storeLoading){
    return (
      <Loader/>
      )
    }
    // if the store is not found and the data is not loading then redirect to store page
  else if(!store && !storeLoading){
    redirect('/')
  }
  return (
   <>
    <Navbar/>
   {children}
   </>


  )
}