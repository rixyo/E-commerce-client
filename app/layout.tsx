// Purpose: Layout for the application
"use client"
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import ModalProvider from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ModalProvider/>
        {children}
        <Toaster/>

        </ThemeProvider>
        </QueryClientProvider>
        </body>
    </html>

  )
}
