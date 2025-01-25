"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "../../components/Navbar/WalletStore"
import { useVerificationStore } from "../../utils/scaffold-eth/verificationStore"
import { NFTGrid } from "../../components/NFTGrid"
import { MintButton } from "../../components/MintButton"
import { BuildingOfficeIcon } from "@heroicons/react/24/outline"

export default function EnterpriseProfilePage() {
  const router = useRouter()
  const { address } = useWalletStore()
  const { verifications } = useVerificationStore()
  const [nfts, setNfts] = useState<NFT[]>([])

  useEffect(() => {
    if (address) {
      const userStatus = verifications[address]
      if (!userStatus || !userStatus.isVerified || !userStatus.isEnterprise) {
        router.push("/verify")
      }
    }
  }, [address, verifications, router])

  useEffect(() => {
    const mockNFTs: NFT[] = [
      {
        id: "1",
        title: "Enterprise Certificate",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "2",
        title: "Business License",
        image: "/placeholder.svg?height=200&width=200",
      },
    ]

    setNfts(mockNFTs)
  }, [])

  if (!address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Enterprise Profile</h1>
        <p>Please connect your wallet to view your enterprise profile.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <BuildingOfficeIcon className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold">Enterprise Wallet: {address}</h1>
      </div>
      <div className="mb-8">
        <MintButton />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Enterprise NFTs</h2>
        <NFTGrid nfts={nfts} />
      </div>
    </div>
  )
}

