"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "../../components/Navbar/WalletStore"
import { useVerificationStore } from "../../utils/scaffold-eth/verificationStore"
import { NFTGrid } from "../../components/NFTGrid"
import { UserIcon } from "@heroicons/react/24/outline"

export default function ProfilePage() {
  const router = useRouter()
  const { address } = useWalletStore()
  const { verifications } = useVerificationStore()
  const [nfts, setNfts] = useState<NFT[]>([])

  useEffect(() => {
    if (address) {
      const userStatus = verifications[address]
      if (!userStatus || !userStatus.isVerified) {
        alert("Please verify your account first")
      } else if (userStatus.isEnterprise) {
        router.push("/enterprise-profile")
      }
    }
  }, [address, verifications, router])

  useEffect(() => {
    const mockNFTs: NFT[] = [
      {
        id: "1",
        title: "Cosmic Drift",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "2",
        title: "Urban Whispers",
        image: "/placeholder.svg?height=200&width=200",
      },
    ]

    setNfts(mockNFTs)
  }, [])

  if (!address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <p>Please connect your wallet to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <UserIcon className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold">Wallet: {address}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
        <NFTGrid nfts={nfts} />
      </div>
    </div>
  )
}

