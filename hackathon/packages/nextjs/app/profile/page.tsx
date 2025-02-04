"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "../../components/Navbar/WalletStore"
import { NFT, NFTGrid } from "../../components/NFTGrid"
import { UserIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import { retrieveDataFromContract } from "~~/utils/wagmi/retrieveDataFromContract"

export default function ProfilePage() {
  const router = useRouter()
  const [nfts, setNfts] = useState<NFT[]>([])

  const searchParams = useSearchParams()
  const entityType = searchParams.get("entityType")
  const address = searchParams.get("address")
  //TODO check if i m calling this function all the time
  useEffect(() => {
    const retrieveData = async () => {
      if(!address) return
      const data = await retrieveDataFromContract(address)
      if(data) {
        //i will receive the nfts as array of objects
        setNfts(data.nfts)
    }
    retrieveData()
  }})

  if(entityType === "user") {
    
    const userInfo = {
      address: searchParams.get("address"),
      
    }
  } else if (entityType === "company") {
    const companyInfo = {
      address: searchParams.get("address"),
    }
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Unknow Profile</h1>
        <p>The address you were looking for is not in our registers!</p>
      </div>
    )
  }

  // useEffect(() => {
  //   const mockNFTs: NFT[] = [
  //     {
  //       id: "1",
  //       title: "Cosmic Drift",
  //       image: "/placeholder.svg?height=200&width=200",
  //     },
  //     {
  //       id: "2",
  //       title: "Urban Whispers",
  //       image: "/placeholder.svg?height=200&width=200",
  //     },
  //   ]
  //   setNfts(mockNFTs)
  // }, [])

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

