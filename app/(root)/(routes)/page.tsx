"use client";
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
      if(!user && !isLoading){
          redirect('/auth')
     }
    else if(!isOpen && user && !store){
     onOpen()
    }

    
  }, [isOpen,onOpen,user,isLoading,store]);
  return null;
}
