import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@heroui/button"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Verify } from "./Verify"
import { useWalletStore } from "./WalletStore"
import { ProfileButton } from "../ProfileButton"
import { Search } from "./Search"

function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { setAddress } = useWalletStore()

  useEffect(() => {
    setAddress(isConnected ? (address ?? null) : null)
  }, [isConnected, address, setAddress])

  return (
    <Button
      onPress={isConnected ? () => disconnect() : () => connect({ connector: injected() })}
      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
    >
      {isConnected ? `Disconnect (${address?.slice(0, 6)}...)` : "Connect Wallet"}
    </Button>
  )
}

export function Navbar() {
  const { address } = useWalletStore()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-blue-500 font-bold text-xl">
              ScaffoldETH
            </Link>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <Search />
          </div>
          <div className="flex items-center">
            <Verify />
            <div className="ml-3">
              <ProfileButton />
            </div>
            <div className="ml-3">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

