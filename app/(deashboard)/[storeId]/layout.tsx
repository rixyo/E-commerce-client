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
  const {data:store,isLoading:storeLoading}=useStore(params.storeId)
  const {data:user,isLoading}=useCurrentUser()
  if(user?.userRole!=="ADMIN" && !isLoading){
    redirect('/')
  }
   if(!params.storeId || params.storeId==='undefined'){
    redirect('/store')
  }
 else if(!store && storeLoading){
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">Data is featching......</div>
    )
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