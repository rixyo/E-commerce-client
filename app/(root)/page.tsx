"use client";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-model";
import { UserButton } from "@clerk/nextjs";

import { useEffect } from "react";
export default function SetupPage() {
  const onOpen = useStoreModal(state=>state.onOpen);
  const isOpen = useStoreModal(state=>state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }


  }, [isOpen,onOpen]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

    </main>
  )
}
