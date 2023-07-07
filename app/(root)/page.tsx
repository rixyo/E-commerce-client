import { UserButton } from "@clerk/nextjs";
export default function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <UserButton afterSignOutUrl="/"/>
    </main>
  )
}
