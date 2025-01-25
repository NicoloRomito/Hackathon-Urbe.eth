"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "../../components/Navbar/WalletStore"
import { useVerificationStore } from "../../utils/scaffold-eth/verificationStore"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"

export default function VerifyPage() {
  const router = useRouter()
  const { address } = useWalletStore()
  const { setVerification } = useVerificationStore()
  const [isEnterprise, setIsEnterprise] = useState(false)

  const handleVerify = () => {
    if (!address) {
      console.log("Please connect your wallet first")
      return
    }

    setVerification(address, { isVerified: true, isEnterprise })
    router.push(isEnterprise ? "/enterprise-profile" : "/profile")
  }

  if (!address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Verification Required</h1>
        <p>Please connect your wallet using MetaMask to verify your account.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Verify Your Account</h1>
      <p className="mb-4">Connected Address: {address}</p>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isEnterprise}
            onChange={(e) => setIsEnterprise(e.target.checked)}
            className="mr-2"
          />
          Verify as Enterprise
        </label>
      </div>
      <button onClick={handleVerify} className="btn btn-primary">
        <ShieldCheckIcon className="h-5 w-5 mr-2" />
        Verify Account
      </button>
    </div>
  )
}