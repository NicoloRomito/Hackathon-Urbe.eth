"use client"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@heroui/button"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Verify } from "./Verify"
import { useWalletStore } from "./WalletStore"
import "../../styles/navbar.css"
import { ProfileButton } from "../ProfileButton"

function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { setAddress } = useWalletStore()

  // Update global store when connection status changes
  useEffect(() => {
    setAddress(isConnected ? (address ?? null) : null)
  }, [isConnected, address, setAddress])

  return (
    <Button
      onPress={isConnected ? () => disconnect() : () => connect({ connector: injected() })}
      className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
    >
      {isConnected ? `Disconnect (${address?.slice(0, 6)}...)` : "Connect Wallet"}
    </Button>
  )
}

export function Navbar() {
  const { address } = useWalletStore()

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                Home
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <Verify />
            </div>
            <div className="ml-3 relative">
              <ProfileButton />
            </div>
            <div className="ml-3 relative">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

