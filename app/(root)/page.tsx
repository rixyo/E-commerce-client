"use client";
import AuthForm from "@/components/AuthForm";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-model";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
export default function SetupPage() {
  const onOpen = useStoreModal(state=>state.onOpen);
  const isOpen = useStoreModal(state=>state.isOpen);
  const router=useRouter();

  useEffect(() => {
    router.push('/auth')
  


  }, [router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

    </main>
  )
}
