"use client"
import { useRouter } from "next/navigation"
import { useWalletStore } from "./Navbar/WalletStore"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export function ProfileButton({entityType}: {entityType: "user" | "company"}) {
  const router = useRouter()
  const { address } = useWalletStore()

  const handleProfileClick = async () => {
    if (!address) {
      alert("Please connect your wallet first")
      return
    }
    router.push(`/profile?entityType=${entityType}&address=${address}`)
  }

  return (
    <button
      onClick={handleProfileClick}
      disabled={!address}
      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white 
      ${address ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${address ? 'focus:ring-blue-500' : 'focus:ring-orange-500'}`}
    >
      <UserCircleIcon className="h-5 w-5 mr-2" />
      Profile
    </button>
  )
}

