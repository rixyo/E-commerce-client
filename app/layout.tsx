import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next/types'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
    </ClerkProvider>

  )
}
