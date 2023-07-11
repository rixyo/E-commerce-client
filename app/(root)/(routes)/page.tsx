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

  useEffect(() => {
    if(!isOpen && user && !isLoading){
     onOpen()
    }

   else  if(!user && !isLoading){
      redirect('/auth')
    }
    
  }, [isOpen,onOpen,user,isLoading]);
  return null;
}
