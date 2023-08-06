"use client";
import { useStoreModal } from "@/hooks/use-store-model";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirstStore from "@/hooks/useFirstStore";


import React,{useEffect} from "react";
export default function SetupPage() {
  const onOpen = useStoreModal(state=>state.onOpen);
  const isOpen = useStoreModal(state=>state.isOpen);



  useEffect(() => {
     if( !isOpen){
     onOpen()
    }

    
  }, [isOpen,onOpen]);
  return null;
}