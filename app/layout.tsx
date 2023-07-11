"use client"
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import ModalProvider from '@/providers/modal-provider'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
  
    <html lang="en">
      
      <body>
      <QueryClientProvider client={queryClient}>
        <ModalProvider/>
        {children}
        <Toaster/>
        </QueryClientProvider>
        </body>
    </html>

  )
}
