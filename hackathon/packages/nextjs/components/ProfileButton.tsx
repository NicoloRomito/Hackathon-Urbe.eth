"use client"

import { useRouter } from "next/navigation"
import { useWalletStore } from "./Navbar/WalletStore"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export function ProfileButton() {
  const router = useRouter()
  const { address } = useWalletStore()

  const handleProfileClick = async () => {
    if (!address) {
      console.log("Please connect your wallet first")
      return
    }

    try {
      const response = await fetch(`http://localhost:3002/verify/status?address=${address}`)
      if (response.ok) {
        const data = await response.json()
        if (data.isVerified) {
          if (data.isEnterprise) {
            router.push("/enterprise-profile")
          } else {
            router.push("/profile")
          }
        } else {
          router.push("/verify")
        }
      } else {
        router.push("/verify")
      }
    } catch (error) {
      console.error("Error checking verification status:", error)
      router.push("/verify")
    }
  }

  return (
    <button
      onClick={handleProfileClick}
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <UserCircleIcon className="h-5 w-5 mr-2" />
      Profile
    </button>
  )
}

