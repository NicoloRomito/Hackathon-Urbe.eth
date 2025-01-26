"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "../../components/Navbar/WalletStore"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"

export default function VerifyPage() {
  const router = useRouter()
  const { address } = useWalletStore()
  const [verificationStatus, setVerificationStatus] = useState<{
    isVerified: boolean
    verifiedBy: string | null
  } | null>(null)

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!address) return

      try { 
        setVerificationStatus({
          isVerified: true,
          verifiedBy: "SPID",
        })
      } catch (error) {
        console.error("Error fetching verification status:", error)
      }
    }

    fetchVerificationStatus()
  }, [address])

  if (!address) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">Verification Required</h1>
          <p className="mt-2 text-gray-600">Please connect your wallet to verify your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Account Verification</h1>
        <p className="mt-2 text-gray-600">Connected Address: {address}</p>

        {verificationStatus?.isVerified ? (
          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ Verified {verificationStatus.verifiedBy ? `by ${verificationStatus.verifiedBy}` : ""}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-gray-600">Your account is pending verification.</p>
          </div>
        )}
      </div>
    </div>
  )
}
