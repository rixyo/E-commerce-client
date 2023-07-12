"use client";
import AuthForm from "@/components/AuthForm";
import { useStoreModal } from "@/hooks/use-store-model";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirstStore from "@/hooks/useFirstStore";
import { redirect } from "next/navigation";
import React,{useEffect} from "react";
export default function SetupPage() {
  const onOpen = useStoreModal(state=>state.onOpen);
  const isOpen = useStoreModal(state=>state.isOpen);
  const {data:user,isLoading}=useCurrentUser()
  const {data:store,isLoading:storeLoading}=useFirstStore()

  useEffect(() => {
    if(!isOpen && user && !isLoading && user.userRole==='ADMIN' && !store && !storeLoading){
     onOpen()
    }

   else  if(!user && !isLoading){
      redirect('/auth')
    }
    
  }, [isOpen,onOpen,user,isLoading,store,storeLoading]);
  return null;
}
