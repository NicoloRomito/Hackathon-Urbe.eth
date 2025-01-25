"use client"

import { useRouter } from "next/navigation"
import { useWalletStore } from "./Navbar/WalletStore"
import { useVerificationStore } from "../utils/scaffold-eth/verificationStore"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export function ProfileButton() {
  const router = useRouter()
  const { address } = useWalletStore()
  const { verifications } = useVerificationStore()

  const handleProfileClick = () => {
    if (!address) {
      console.log("Please connect your wallet first")
      return
    }

    const userStatus = verifications[address] || { isVerified: false, isEnterprise: false }

    if (userStatus.isVerified) {
      if (userStatus.isEnterprise) {
        router.push("/enterprise-profile")
      } else {
        router.push("/profile")
      }
    } else {
      router.push("/verify")
    }
  }

  return (
    <button onClick={handleProfileClick} className="btn btn-primary btn-sm font-normal gap-2 mr-2">
      <UserCircleIcon className="h-5 w-5" />
      Profile
    </button>
  )
}