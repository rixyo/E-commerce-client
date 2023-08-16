// Purpose: Layout for the application
"use client"
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import ModalProvider from '@/providers/modal-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { ThemeProvider } from '@/providers/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
  
    <html lang="en">
      <body>
      <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ModalProvider/>
        {children}
        <Toaster/>
      </ThemeProvider>
    </ReactQueryProvider>
        </body>
    </html>

  )
}
