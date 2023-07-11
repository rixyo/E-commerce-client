"use client"

import Navbar from "@/components/Navbar"
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
  const {data:user,isLoading}=useCurrentUser()
  const {data:store,isLoading:storeLoading}=useStore(params.storeId)
  if(!user && !isLoading){
    redirect('/auth')
  }
 else if(!store && storeLoading){
    return <div
    className="flex justify-center items-center h-screen"
    >Loading.......</div>
  }
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