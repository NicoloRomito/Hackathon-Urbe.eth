"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Menu, Button, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useWalletStore } from "./WalletStore"
import { ProfileButton } from "../ProfileButton"
import { Search } from "./Search"
import { Verify } from "./Verify"
import { isUserVerified } from "~~/utils/wagmi/isUserVerified"
import { searchIfUserOrCompany } from "~~/utils/wagmi/searchIfUserOrCompany"

function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { setAddress } = useWalletStore()

  useEffect(() => {
    setAddress(isConnected ? (address ?? null) : null)
  }, [isConnected, address, setAddress])


  

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={isConnected ? () => disconnect() : () => connect({ connector: injected() })}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function Navbar() {
  const [showVerifyPopup, setShowVerifyPopup] = useState(false)
  const { address } = useAccount();
  const [userVerified, setUserVerified] = useState(false)
  const [entityType , setEntityType] = useState<"user" | "company">("user")


  //TODO make a fetch call to the backend to check if the user is verified
  useEffect(() => {
    const checkUserVerified = async () => {
      if(!address) return
      const verified = await isUserVerified(address)
      setUserVerified(true)
    }
    const isUserOrCompany = async() => {
      if(!address) return
      const isUser = await searchIfUserOrCompany(address);
      isUser ? setEntityType("user") : setEntityType("company")
    }
    checkUserVerified()
    isUserOrCompany()
  }, [address])

  //const userVerified = checkUserVerified()
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-blue-500 font-bold text-4xl">
              DE-VY
            </Link>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <Search />
          </div>
          <div className="flex items-center">
            <div className="ml-3">
            <button
                onClick={() => setShowVerifyPopup(true)}
                disabled={address ? false : true}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md
            text-white  ${address ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-600 cursor-not-allowed" } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>Verify
</button> 
            </div>
            <div className="ml-3">
              <ProfileButton entityType={entityType}/>
            </div>
            <div className="ml-3">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
      {showVerifyPopup && <Verify onClose={() => setShowVerifyPopup(false)} onSuccess={() => {
        setShowVerifyPopup(false);
        setUserVerified(true)}} />}
    </nav>
  )
}